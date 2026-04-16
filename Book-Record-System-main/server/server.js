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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// STATIC FILE SERVING
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);

mongoose
  .connect("mongodb+srv://itsyashchandratre004:I1FPzMOsgKgIKhd2@mycluster.hshaztv.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
