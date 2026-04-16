import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/Api";
import axios from "axios";
const AdminHome = () => {

  const [books, setBooks] = useState([]);
  const navigate=useNavigate();
  const loadBooks = async () => {
    try {
      const books = await API.get("/books")
      setBooks(books.data)

    } catch (error) {
      console.log("Error in Loading Books", error);
    }
  }
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); 
      navigate("/");                  
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  useEffect(() => {
    loadBooks();
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are You Sure You want to delete the Book ?");
    if (confirm) {
      try {
        await API.delete(`books/${id}`)
        .then(res => alert("Book Deleted"))
        .catch(err => console.log("Error in deleting book ",err));
        loadBooks();
      }
      catch (error) {
        console.log("Error in deleting book", error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Book Record Management – Books
        </h1>

        <Link to='/admin/addbook' className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          + Add New Book
        </Link>
        
      </div>
      <button
      onClick={handleLogout}
      className="px-4 py-2 mb-3 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-scroll">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Author
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {index + 1}
                </td>

                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {book.title}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {book.author}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {book.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <img className="rounded h-15" src={`http://localhost:8000${book.image.path}`} alt="" />
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  ₹{book.price}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {book.stock}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      book.status === "AVAILABLE"
                      ? "bg-green-100 text-green-700"
                      : book.status === "LIMITED"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {book.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <Link to={`/admin/editbook/${book._id}`} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(book._id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
