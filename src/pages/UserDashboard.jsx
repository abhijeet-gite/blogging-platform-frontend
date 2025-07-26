import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/posts/myblogs").then((res) => setBlogs(res.data)).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await API.delete(`/posts/${id}`);
      setBlogs(blogs.filter(b => b._id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white p-4 mb-2 shadow flex justify-between">
          <h3>{blog.title}</h3>
          <div>
            <Link to={`/edit/${blog._id}`} className="text-blue-500 mr-4">Edit</Link>
            <button onClick={() => handleDelete(blog._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
