import { HiOutlineClock } from "react-icons/hi";

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  onClick?: () => void;
}

export const PostCard = ({ title, content, author, createdAt, onClick }: PostCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
      <div 
        className="prose prose-sm max-w-none text-gray-700 mb-4 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{author}</span>
        <div className="flex items-center gap-1">
          <HiOutlineClock className="w-4 h-4" />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
