
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const plainText = blog.content.replace(/<[^>]+>/g, ""); // Remove HTML tags

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* ✅ Blog Title */}
      <h2 className="text-2xl font-semibold text-gray-900 px-4 pt-4 line-clamp-2">
        {blog.title}
      </h2>

      {/* ✅ Author & Date */}
      <div className="flex items-center text-gray-500 text-sm px-4 mt-2 mb-3">
        <span>✍️ {blog.author?.username || "Anonymous"}</span>
        <span className="mx-2">•</span>
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* ✅ Blog Description */}
      <p className="text-gray-700 text-base px-4 mb-4 line-clamp-3">
        {plainText.length > 150 ? `${plainText.slice(0, 150)}...` : plainText}
      </p>

      {/* ✅ Read More Button */}
      <div className="px-4 pb-4">
        <Link
          to={`/blog/${blog._id}`}
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;


