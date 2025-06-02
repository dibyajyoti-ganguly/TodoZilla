require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(cors());

app.use(express.json());

const validateAuthBody = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res.status(301).json("Email or Password cannot be empty");

  next();
};

app.post("/signup", validateAuthBody, async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json("A user with the same email already exists"); // 409 is more appropriate for conflicts
    }

    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id.toString() }, JWT_SECRET);
    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", validateAuthBody, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) return res.status(301).json("User with the given email not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
  res.status(200).json({
    message: "User logged in",
    token: token,
  });
});

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) res.status(401).json("Token not provided");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Verification failed:", err.message);
    return res.status(401).json("Invalid token...access denied");
  }
}

app.get("/todo", auth, async (req, res) => {
  const todos = await TodoModel.find({
    userId: req.userId,
  });

  if (!todos) return res.status(301).json("Check the token again");

  res.status(200).json(todos);
});

app.post("/addItem", auth, async (req, res) => {
  const userId = req.userId;

  await TodoModel.create({
    description: req.body.item,
    userId: userId,
  });

  const todos = await TodoModel.find({
    userId: userId,
  });

  console.log(todos);

  res.status(200).json(todos);
});

app.listen(3000);
