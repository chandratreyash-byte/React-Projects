import React,{ useEffect, useState } from "react";
import API from "../api/Api";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate=useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
 const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); 
      navigate("/");                  
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const loadBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Error loading books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📚 Available Books
      </h1>
      <button
      onClick={handleLogout}
      className="px-4 py-2 mb-3 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition col-span-3"
            >
              <div className="h-65 justify-center flex">
              <img className="h-60 bg-cover rounded" src={`http://localhost:8000${book.image.path}`} alt={book.title} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {book.title}
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                ✍ Author: {book.author}
              </p>

              <p className="text-gray-600 text-sm">
                📂 Category: {book.category}
              </p>

              <p className="text-lg font-bold text-green-600 mt-3">
                ₹ {book.price}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
                  ${
                    book.status === "AVAILABLE"
                      ? "bg-green-100 text-green-700"
                      : book.status === "LIMITED"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {book.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHome;
