
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import AdSenseAd from "../components/AdSenseAd"; // ✅ Import Ad Component

function UserDashboard() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?._id) {
      API.get(`/posts/user/${user._id}`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.error("Error fetching blogs:", err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      try {
        await API.delete(`/posts/${id}`);
        setBlogs(blogs.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">📝 My Blogs</h2>

        {/* ✅ Ad at Top */}
        <div className="my-6">
          <AdSenseAd slot="2307121561" />
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't created any blogs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div key={blog._id + index} className="w-full">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
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
                </div>

                {/* ✅ Insert Ad after every 3 blogs */}
                {(index + 1) % 3 === 0 && (
                  <div key={`ad-${index}`} className="col-span-full my-4">
                    <AdSenseAd slot="2307121561" />
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



