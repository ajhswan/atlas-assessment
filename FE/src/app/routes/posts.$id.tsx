import { useLoaderData, useNavigate, Form, redirect, useActionData, useSearchParams } from "react-router";
import type { Route } from "../+types/routes/posts.$id";
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { requireAuth } from "../session.server";
import { getPostById, deletePost } from "../api.server";
import type { PostResponse } from "@/types/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      author: post.user_id || "Unknown",
      createdAt: post.created_at || post.updated_at,
    }
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  const { token } = await requireAuth(request);
  const { id } = params;
  
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    try {
      await deletePost(token, id);
      return redirect("/?success=post-deleted");
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Failed to delete post",
      };
    }
  }

  return { error: "Invalid action" };
}

export default function PostDetail() {
  const { post } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "post-updated") {
      toast.success("Post updated successfully!");
      searchParams.delete("success");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-100 rounded-lg transition-colors mb-6"
      >
        <HiOutlineArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-medium">{post.author}</span>
            <div className="flex items-center gap-1">
              <HiOutlineClock className="w-4 h-4" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none text-gray-700 break-words overflow-wrap-anywhere"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={() => navigate(`/posts/${post.id}/edit`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <HiOutlinePencil className="w-4 h-4" />
            <span>Edit</span>
          </button>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <HiOutlineTrash className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </article>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900 bg-opacity-20"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Post?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
