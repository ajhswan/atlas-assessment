import { Form, redirect, useActionData, useNavigate, useLoaderData } from "react-router";
import type { Route } from "../+types/routes/posts.$id.edit";
import { useForm, Controller } from "react-hook-form";
import { TiptapEditor } from "@/components/TiptapEditor";
import { getPostById } from "../api.server";
import { requireAuth } from "../session.server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { PostResponse } from "@/types/api";

interface PostFormData {
  title: string;
  content: string;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { token } = await requireAuth(request);
  const { id } = params;
  
  const response = await getPostById(token, id) as PostResponse;
  const post = response.data;

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return { 
    post: {
      id: post.id,
      title: post.title,
      content: post.content,
    }
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  const { token } = await requireAuth(request);
  const { id } = params;

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  console.log('Updating post:', { id, title, content });

  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Failed to update post" }));
      console.error('BE Error:', response.status, error);
      throw new Error(error.message || `Failed to update post (${response.status})`);
    }

    console.log('Post updated successfully');
    return redirect(`/posts/${id}?success=post-updated`);
  } catch (error) {
    console.error('Failed to update post:', error);
    return {
      error: error instanceof Error ? error.message : "Failed to update post",
    };
  }
}

export default function EditPost() {
  const { post } = useLoaderData<typeof loader>();
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
      title: post.title || "",
      content: post.content || "",
    },
    mode: "onBlur",
  });

  const contentValue = watch("content");

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Edit Post</CardTitle>
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
                    {isSubmitting ? "Updating..." : "Update Post"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/posts/${post.id}`)}
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
