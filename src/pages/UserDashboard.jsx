
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import AdSenseAd from "../components/AdSenseAd";
import { Helmet } from "react-helmet-async";

function UserDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?._id) {
      API.get(`/posts/user/${user._id}`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.error("Error fetching blogs:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await API.delete(`/posts/${id}`);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        Loading your blogs...
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Blogs | Dashboard</title>
        <meta name="description" content="Manage your blogs from your personal dashboard." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">📝 My Blogs</h2>

        {/* ✅ Ad at Top */}
        <div className="my-6">
          <AdSenseAd />
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4 text-lg">You haven't created any blogs yet.</p>
            <Link
              to="/create"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg text-lg hover:opacity-90 transition"
            >
              ➕ Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div key={blog._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
                </p>
                <div className="flex justify-between mt-auto">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
                {(index + 1) % 3 === 0 && (
                  <div className="col-span-full my-4">
                    <AdSenseAd />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;




