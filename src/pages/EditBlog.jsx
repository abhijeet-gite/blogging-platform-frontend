
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      alert("⚠️ Please login to edit blogs.");
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Fetch Blog Details
  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(() => alert("❌ Failed to load blog details"))
      .finally(() => setFetching(false));
  }, [id]);

  // ✅ Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("⚠️ Please enter a title and content.");
      return;
    }

    setLoading(true);
    try {
      await API.put(`/posts/${id}`, { title, content });
      alert("✅ Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "❌ Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-gray-600 text-lg">Loading blog details...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 shadow rounded mt-6"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 border mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-4"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />

      <button
        type="submit"
        className="bg-green-500 text-white w-full p-2 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </form>
  );
}

export default EditBlog;


