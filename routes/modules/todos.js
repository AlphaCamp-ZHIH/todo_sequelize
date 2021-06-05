const express = require("express");

const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;

router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/", (req, res) => {
  const UserId = req.user.id;
  const name = req.body.name;
  return Todo.create({
    name,
    UserId,
  })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});
router.get("/:id/edit", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  return Todo.findOne({
    where: {
      UserId,
      id,
    },
  })
    .then((todo) => res.render("edit", { todo: todo.toJSON() }))
    .catch((e) => console.log(e));
});
router.put("/:id", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  const { name } = req.body;
  const isDone = req.body.isDone === "on" ? true : false;
  return Todo.findOne({
    where: {
      UserId,
      id,
    },
  })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone;
      return todo.save();
    })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

router.delete("/:id", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  return Todo.destroy({
    where: {
      UserId,
      id,
    },
  })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

module.exports = router;
