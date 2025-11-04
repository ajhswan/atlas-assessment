import { Form, redirect, useActionData, useNavigate } from "react-router";
import type { Route } from "../+types/routes/posts.new";
import { useForm, Controller } from "react-hook-form";
import { TiptapEditor } from "@/components/TiptapEditor";
import { createPost } from "../api.server";
import { requireAuth } from "../session.server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface PostFormData {
  title: string;
  content: string;
}

export async function action({ request }: Route.ActionArgs) {
  const { token } = await requireAuth(request);

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  console.log('Creating post:', { title, content });

  try {
    const result = await createPost(token, { title, content });
    console.log('Post created:', result);
    return redirect("/?success=post-created");
  } catch (error) {
    console.error('Failed to create post:', error);
    return {
      error: error instanceof Error ? error.message : "Failed to create post",
    };
  }
}

export default function NewPost() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onBlur",
  });

  const contentValue = watch("content");


  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Form 
              method="post" 
              onSubmit={(e) => {
                handleSubmit(() => {
                  // Let the form submit naturally if validation passes
                })();
                // Prevent if there are validation errors
                if (Object.keys(errors).length > 0) {
                  e.preventDefault();
                }
              }}
            >
              <div className="space-y-6">
                {actionData?.error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                    {actionData.error}
                  </div>
                )}

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title", { 
                      required: "Title is required",
                      minLength: { value: 3, message: "Title must be at least 3 characters" },
                      maxLength: { value: 200, message: "Title must be less than 200 characters" }
                    })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter post title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Controller
                    name="content"
                    control={control}
                    rules={{ 
                      required: "Content is required",
                      minLength: { value: 10, message: "Content must be at least 10 characters" }
                    }}
                    render={({ field }) => (
                      <div className={errors.content ? "border-2 border-red-500 rounded-md" : ""}>
                        <TiptapEditor content={field.value} onChange={field.onChange} />
                      </div>
                    )}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                  )}
                  <input type="hidden" name="content" value={contentValue} />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating..." : "Create Post"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
