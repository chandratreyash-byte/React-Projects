import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/Api";

const EditBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    status: "AVAILABLE",
    image: null,
  });

  const loadBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setFormData(res.data);
      if (res.data.image?.path) {
        setPreview(`http://localhost:8000${res.data.image.path}`);
      }
    } catch (error) {
      console.error("Error fetching book", error);
    }
  };

  useEffect(() => {
    loadBook();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let status = "AVAILABLE";
    if (Number(formData.stock) <= 0) status = "OUT_OF_STOCK";
    else if (Number(formData.stock) <= 5) status = "LIMITED";

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("status", status);

      if (file) {
        data.append("image", file); //only if new image selected
      }

      await API.put(`/books/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book Updated Successfully");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Error updating book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6">✏️ Update Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border px-4 py-2 rounded"
            required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-40 rounded border"
            />
          )}

          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-white hover:text-black border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
