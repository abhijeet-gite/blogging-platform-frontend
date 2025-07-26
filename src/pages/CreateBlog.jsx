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

  useEffect(() => {
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content before publishing.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/posts/create", { title, content }); // ✅ Corrected endpoint
      console.log("Response:", response.data);
      alert("✅ Blog created successfully! Waiting for admin approval.");
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error.response?.data || error.message);
      alert("❌ Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!ReactQuill) return <p className="text-center mt-10">Loading editor...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
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
            ["clean"]
          ]
        }}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}

export default CreateBlog;


