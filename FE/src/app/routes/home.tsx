import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "../+types/routes/home";
import { Header } from "@/components/Header";
import { PostList } from "@/components/PostList";
import { requireAuth } from "../session.server";

export async function loader({ request }: Route.LoaderArgs) {
  // Require authentication - redirects to login if not authenticated
  await requireAuth(request);
  
  // Example loader - will be replaced with actual API call
  const mockPosts = [
    {
      id: "1",
      title: "Welcome to Atlas",
      content: "This is a sample post to demonstrate the post viewing functionality. You can create your own posts using the Create Post button in the header.",
      author: "Admin",
      createdAt: new Date().toISOString(),
    },
  ];
  
  return { posts: mockPosts };
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleCreatePost = () => {
    // TODO: Navigate to create post page or open modal
    console.log("Create post clicked");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const handlePostClick = (postId: string) => {
    // TODO: Navigate to post detail page
    console.log("Post clicked:", postId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onCreatePost={handleCreatePost} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Posts</h1>
          <p className="text-gray-600">Browse and interact with community posts</p>
        </div>
        
        <PostList posts={posts} onPostClick={handlePostClick} />
      </main>
    </div>
  );
}
