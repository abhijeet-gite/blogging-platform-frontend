
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { Helmet } from "react-helmet-async";

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!blog) return <div className="text-center mt-10">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt || blog.title} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {blog.author?.name || "Unknown"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}

export default BlogView;









