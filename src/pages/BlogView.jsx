
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { Helmet } from "react-helmet-async";
import AdPlaceholder from "../components/AdPlaceholder";

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => setError("❌ Failed to load blog. Please try again later."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500 text-lg">Loading blog...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!blog) return <p className="text-center text-gray-500">No blog found.</p>;

  const metaDescription = blog?.content
    ? blog.content.replace(/<[^>]+>/g, "").substring(0, 150)
    : "Blog details";

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{blog.title} | MyBlog</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        {/* ✅ Blog Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-6">
          {blog.title}
        </h1>

        {/* ✅ Author & Date */}
        <div className="flex justify-center items-center text-gray-500 text-sm mb-6 space-x-4">
          <span>✍️ By {blog.author || "Anonymous"}</span>
          <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* ✅ Share Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Facebook
          </a>
        </div>

        {/* ✅ Blog Content with Tailwind Prose */}
        <article
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></article>

        {/* ✅ Ads Section */}
        <div className="my-10">
          <AdPlaceholder />
        </div>

        {/* ✅ Back Button */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg text-lg hover:opacity-90 transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogView;


