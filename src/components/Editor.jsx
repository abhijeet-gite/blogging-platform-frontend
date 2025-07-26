import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

function Editor({ value, onChange }) {
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  if (!ReactQuill) return <p className="text-gray-500">Loading editor...</p>;

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="mb-4"
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"]
        ]
      }}
    />
  );
}

export default Editor;
