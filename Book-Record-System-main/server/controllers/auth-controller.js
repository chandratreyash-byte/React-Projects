const User = require('../models/user-model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const signup = async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      res.status(400).json({ msg: "User already Exist" })
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        fname,
        email,
        password: hashedPassword,
      })
      return res.status(200).json({ msg: "User signupd Sucessfully" })
    }

  } catch (error) {
    res.status(400).send({ msg: "Internal Server Error" })
  }
}

const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    });
    res.json({
      msg: "Login successful",
      user: { id: user._id, email: user.email,role:user.role },
    });

  } catch (err) {
    return res.status(500).json({ msg: "Error logging in", error: err });
  }
}


const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,     // true in production HTTPS
    domain: "localhost",
    path: "/",
  });

  return res.status(200).json({
    msg: "Logged out successfully",
  });
};

module.exports = { signup, login, logout };
