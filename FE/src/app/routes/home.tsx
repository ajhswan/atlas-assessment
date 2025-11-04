import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { Route } from "../+types/routes/home";
import { PostList } from "@/components/PostList";
import { requireAuth } from "../session.server";
import { getPosts } from "../api.server";
import { useEffect } from "react";
import { toast } from "react-toastify";

export async function loader({ request }: Route.LoaderArgs) {
  const { token } = await requireAuth(request);
  
  let posts = [];
  try {
    const response = await getPosts(token);
    posts = (response.data || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.user_id || "Unknown",
      createdAt: post.created_at || post.updated_at,
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
  
  return { posts };
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "post-created") {
      toast.success("Post created successfully!");
      searchParams.delete("success");
      setSearchParams(searchParams, { replace: true });
    } else if (success === "post-deleted") {
      toast.success("Post deleted successfully!");
      searchParams.delete("success");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Posts</h1>
        <p className="text-gray-600">Browse and interact with community posts</p>
      </div>
      
      <PostList posts={posts} onPostClick={handlePostClick} />
    </main>
  );
}
