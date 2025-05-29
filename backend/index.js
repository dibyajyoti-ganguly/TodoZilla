require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

const auth_data = [
  {
    email: "jdoe9@gmail.com",
    password: "1234",
    items: ["Get up", "Brush teeth", "Breakfast", "Code"],
  },
];

app.use(cors());

app.use(express.json());

const validateAuthBody = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res.status(301).json("Email or Password cannot be empty");

  next();
};

app.post("/signup", validateAuthBody, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = auth_data.find((user) => user.email === email);

  if (user) {
    return res
      .status(301)
      .json("A user with the same credentials already exists");
  }

  auth_data.push({
    email: email,
    password: password,
    items: [],
  });
  const token = jwt.sign({ email }, JWT_SECRET);
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
  console.log(auth_data);
});

app.post("/signin", validateAuthBody, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = auth_data.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) return res.status(301).json("User with the given email not found");

  const token = jwt.sign({ email }, JWT_SECRET);
  res.status(200).json({
    message: "User logged in",
    token: token,
  });
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) res.status(301).json("User not logged in");
  else {
    req.email = decoded.email;
    next();
  }
}

app.get("/todo", auth, (req, res) => {
  const user = auth_data.find((user) => user.email === req.email);

  if (!user) return res.status(301).json("Invalid token");

  res.status(200).json(user.items);
});

app.post("/addItem", auth, (req, res) => {
  const user = auth_data.find((user) => user.email === req.email);

  if (!user) return res.status(301).json("Invalid token");

  user.items.push(req.body.item);

  console.log(user.items);

  res.status(200).json(user.items);
});

app.listen(3000);
