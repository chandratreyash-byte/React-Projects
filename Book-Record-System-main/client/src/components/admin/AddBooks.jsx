import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";

const AddBook = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    status: "AVAILABLE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const validateBook = () => {
    const e = {};
    const namePattern = /^[A-Za-z\s]+$/;

    if (!bookData.title.trim()) e.title = "Please enter book title";

    if (!bookData.author.trim())
      e.author = "Please enter author name";
    else if (!namePattern.test(bookData.author))
      e.author = "Author name should contain letters only";

    if (!bookData.category.trim())
      e.category = "Please enter book category";

    if (!bookData.price)
      e.price = "Please enter book price";
    else if (Number(bookData.price) <= 0)
      e.price = "Price must be greater than 0";

    if (!bookData.stock)
      e.stock = "Please enter book stock";
    else if (Number(bookData.stock) < 0)
      e.stock = "Stock cannot be negative";

    if (!file) e.file = "Please upload book image";

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateBook();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    let status = "AVAILABLE";
    const stock = Number(bookData.stock);
    if (stock <= 0) status = "OUT_OF_STOCK";
    else if (stock <= 5) status = "LIMITED";

    try {
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("category", bookData.category);
      formData.append("price", bookData.price);
      formData.append("stock", bookData.stock);
      formData.append("status", status);
      formData.append("image", file);

      await API.post("/books/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book Added Successfully");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Error adding book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6">➕ Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={bookData.author}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.author && <p className="text-xs text-red-500">{errors.author}</p>}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={bookData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.file && <p className="text-xs text-red-500">{errors.file}</p>}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={bookData.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={bookData.stock}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}

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
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
