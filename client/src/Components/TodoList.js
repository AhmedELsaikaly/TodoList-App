import axios from "axios";
import React, { useEffect, useState } from "react";
import todo from "./todo.svg";
import Spinner from "./Spinner";
const TodoList = () => {
  const [todos, setTodos] = useState({ loading: true, todosItems: [] });
  const [todoText, setTodoText] = useState("");

  // get the todos from data base
  async function getTodos() {
    try {
      const todoList = await axios.get("/api/todo");
      setTodos({
        ...todos,
        todosItems: todoList.data.reverse(),
        loading: false,
      });
    } catch (err) {
      console.error(err.response.data);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  // handle change in input of todo
  const onChange = (e) => setTodoText(e.target.value);

  // handle submit of form
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      async function postTodos() {
        await axios.post("/api/todo", { text: todoText });
        setTodoText("");
        getTodos();
      }
      postTodos();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // handling delete click
  const handleClick = (id) => {
    try {
      setTodos({
        ...todos,
        todosItems: todos.todosItems.filter((todo) => todo._id !== id),
      });
      async function deleteTodo() {
        await axios.delete(`/api/todo/${id}`);
      }
      deleteTodo();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  //  handling check  click
  const handleCheck = (id) => {
    try {
      const index = todos.todosItems.findIndex((todo) => todo._id === id);
      let tempTodos = todos.todosItems.slice();
      tempTodos[index].checked = !tempTodos[index].checked;
      setTodos({
        ...todos,
        todosItems: tempTodos,
      });

      async function updateTodo() {
        await axios.put(`/api/todo/${id}`);
      }
      updateTodo();
    } catch (err) {
      console.error(err.response);
    }
  };
  return (
    <div>
      <div className="main">
        <div id="myDIV" className="header">
          <form onSubmit={onSubmit}>
            <h2 className="head">My To Do List</h2>
            <input
              name="todoText"
              value={todoText}
              type="text"
              id="myInput"
              required
              placeholder="What do you need to do..."
              onChange={onChange}
            />
            <button className="addBtn">Save Item</button>
          </form>
        </div>
        {todos.loading === true ? (
          <Spinner />
        ) : (
          <ul id="myUL">
            {todos.todosItems &&
              todos.todosItems.map((todo) => (
                <li className={todo.checked ? "checked" : ""} key={todo._id}>
                  {todo.text}
                  <i
                    className="fa fa-trash"
                    onClick={() => handleClick(todo._id)}
                  ></i>{" "}
                  <i
                    className="fa fa-check"
                    aria-hidden="true"
                    onClick={() => {
                      handleCheck(todo._id);
                    }}
                  ></i>
                </li>
              ))}
          </ul>
        )}

        {todos.todosItems.length === 0 ? (
          <div className="EmptyList">
            <img className="EmptyList__img" src={todo} alt="list is empty" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TodoList;
