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

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading blog...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!blog) return <p className="text-center text-gray-500">No blog found.</p>;

  const metaDescription = blog?.content
    ? blog.content.replace(/<[^>]+>/g, "").substring(0, 150)
    : "Blog details";

  return (
    <div className="bg-white p-6 shadow rounded max-w-3xl mx-auto mt-6">
      <Helmet>
        <title>{blog.title} | MyBlog</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      {/* ✅ Ad Section */}
      <AdPlaceholder />

      {/* ✅ Back Button */}
      <div className="mt-6">
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}

export default BlogView;

