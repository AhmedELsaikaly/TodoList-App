const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Todo = require("../../models/Todo");

// @route    POST api/todo
// @desc    Create Todo

router.post("/", async (req, res) => {
  if (req.body.text === "") {
    return res.status(400).json({ msg: "todo text is required" });
  }
  const { text, checked } = req.body;
  try {
    const newTodo = new Todo({
      text: text,
      name: checked,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Get api/todo
// @desc    Get all Todos

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Delete api/todo/:id
// @desc    delete one todo by ID

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "todo not found" });
    }
    await todo.remove();

    res.json({ msg: "todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    put api/todo/:id
// @desc    update checked value

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "todo not found" });
    }
    const newTodo = await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          checked: !todo.checked,
        },
      }
    );
    res.json({ msg: "todo updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
