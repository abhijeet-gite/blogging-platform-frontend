
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

function Editor({ value, onChange, placeholder = "Write your blog content..." }) {
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  if (!ReactQuill) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-h-[250px]"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />
    </div>
  );
}

export default Editor;
