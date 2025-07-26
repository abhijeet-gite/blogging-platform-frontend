
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const [ReactQuill, setReactQuill] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Dynamically import ReactQuill for better performance
  useEffect(() => {
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content before publishing.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/posts/create", { title, content });
      console.log("Response:", response.data);
      alert("✅ Blog created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error.response?.data || error.message);
      alert("❌ Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show loading while editor loads
  if (!ReactQuill) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-gray-600 text-lg">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 flex justify-center px-4 sm:px-6 lg:px-20 py-8">
      <div className="bg-white rounded-xl shadow-xl w-full p-6 sm:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          ✍️ Create a New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ Blog Title Input */}
          <input
            type="text"
            placeholder="Enter blog title"
            className="w-full p-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* ✅ Rich Text Editor */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="min-h-[300px] sm:min-h-[400px]"
              placeholder="Write your blog content here..."
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
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Publishing..." : "✅ Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;




