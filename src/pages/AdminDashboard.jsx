
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/admin/pending")
      .then((res) => setPendingBlogs(res.data))
      .catch(() => setError("Failed to load pending blogs."))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    if (window.confirm("✅ Approve this blog?")) {
      try {
        await API.put(`/admin/approve/${id}`);
        setPendingBlogs(pendingBlogs.filter((b) => b._id !== id));
      } catch (err) {
        alert("❌ Approve failed!");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("❌ Delete this blog?")) {
      try {
        await API.delete(`/posts/${id}`);
        setPendingBlogs(pendingBlogs.filter((b) => b._id !== id));
      } catch (err) {
        alert("❌ Delete failed!");
      }
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading pending blogs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🛠 Admin Dashboard</h2>

      {pendingBlogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pending blogs. ✅</p>
      ) : (
        <div className="space-y-4">
          {pendingBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-600 text-sm">
                  By {blog.author || "Anonymous"}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleApprove(blog._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
