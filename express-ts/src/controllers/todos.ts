import { RequestHandler } from "express";
import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.json({ message: "Created the todo..", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;

  const updateText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === id);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText);
  res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id === id);

  if (todoIndex < 0) {
    res.status(500).json({ message: "Element not found!" });
  }

  TODOS.splice(todoIndex, 1);

  res.status(200).json({ message: "Todo Deleted!" });
};
