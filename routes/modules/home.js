const express = require("express");

const router = express.Router();

const db = require("../../models");
const User = db.User;
const Todo = db.Todo;
router.get("/", (req, res) => {
  const UserId = req.user.id;
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId },
  }).then((todos) => {
    console.log(todos);
    const notFinished =todos.filter(todo => todo.isDone === 0);
    todos = todos.filter(todo => todo.isDone === 1)
    return res.render("index", { todos ,notFinished})});
});

module.exports = router;
