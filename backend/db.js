require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`
);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  userId: ObjectId,
  description: String,
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel,
  TodoModel,
};
