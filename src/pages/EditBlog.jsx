import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, { title, content });
      navigate("/dashboard");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
      <input type="text" placeholder="Title" className="w-full p-2 mb-4 border"
        value={title} onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill value={content} onChange={setContent} className="mb-4" />
      <button className="bg-green-500 text-white w-full p-2">Update</button>
    </form>
  );
}

export default EditBlog;
