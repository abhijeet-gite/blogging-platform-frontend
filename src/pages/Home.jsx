import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdPlaceholder from "../components/AdPlaceholder";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Helmet>
        <title>MyBlog | Latest Blogs</title>
        <meta
          name="description"
          content="Read the latest blogs on MyBlog platform. Stay updated with trending articles."
        />
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">Latest Blogs</h2>

      <AdPlaceholder /> {/* ✅ Ad at Top */}

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p
                  className="text-gray-600 mb-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <Link
                  to={`/blog/${blog._id}`}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:opacity-90"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

