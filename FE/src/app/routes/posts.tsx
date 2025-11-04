import { useLoaderData } from "react-router";
import type { Route } from "../+types/routes/posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function loader({ request }: Route.LoaderArgs) {
  // Mock posts data - replace with actual API call
  return {
    posts: [
      { id: 1, title: "First Post", excerpt: "This is the first post", author: "User 1" },
      { id: 2, title: "Second Post", excerpt: "This is the second post", author: "User 2" },
      { id: 3, title: "Third Post", excerpt: "This is the third post", author: "User 3" },
    ],
  };
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>By {post.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
