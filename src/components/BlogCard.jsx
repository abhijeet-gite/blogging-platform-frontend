import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 text-sm mb-2">By {blog.author?.username || "Anonymous"}</p>
      <p className="text-gray-700 mb-3 line-clamp-3">{blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...</p>
      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-500 hover:underline font-semibold"
      >
        Read More →
      </Link>
    </div>
  );
}

export default BlogCard;
