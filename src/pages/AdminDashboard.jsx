import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [pendingBlogs, setPendingBlogs] = useState([]);

  useEffect(() => {
    API.get("/admin/pending").then((res) => setPendingBlogs(res.data)).catch(console.error);
  }, []);

  const handleApprove = async (id) => {
    await API.put(`/admin/approve/${id}`);
    setPendingBlogs(pendingBlogs.filter(b => b._id !== id));
  };

  const handleDelete = async (id) => {
    await API.delete(`/posts/${id}`);
    setPendingBlogs(pendingBlogs.filter(b => b._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pending Blogs</h2>
      {pendingBlogs.map((blog) => (
        <div key={blog._id} className="bg-white p-4 mb-2 shadow flex justify-between">
          <h3>{blog.title}</h3>
          <div>
            <button onClick={() => handleApprove(blog._id)} className="text-green-500 mr-4">Approve</button>
            <button onClick={() => handleDelete(blog._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
