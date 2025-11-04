import { PostCard } from "./PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
  onPostClick?: (postId: string) => void;
}

export const PostList = ({ posts, onPostClick }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          createdAt={post.createdAt}
          onClick={() => onPostClick?.(post.id)}
        />
      ))}
    </div>
  );
};
