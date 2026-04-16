const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRouter = require("./router/auth-router");
const bookRouter = require("./router/book-router");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "https://bookrecord-by-yash.netlify.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// STATIC FILE SERVING
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
const MoURI = process.env.MONGO_URI;
mongoose
  .connect(MoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
