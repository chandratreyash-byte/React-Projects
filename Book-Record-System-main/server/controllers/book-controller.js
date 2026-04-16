const Book = require("../models/book-model");

const addBook = async (req, res) => {
  try {
    const image = req.file
      ? {
          path: `/uploads/${req.file.filename}`,
          filename: req.file.filename,
        }
      : null;

    const { title, author, category, price, stock, status } = req.body;

    const book = await Book.create({
      title,
      author,
      category,
      image,
      price,
      stock,
      status,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

  const updateBook = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = {
        path: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
      };
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
