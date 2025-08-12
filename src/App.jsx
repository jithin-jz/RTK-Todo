import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, editTask } from "./tasksSlice";
import "./App.css";

function TodoList() {
  const [taskText, setTaskText] = useState("");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  const handleEditTask = (id, text) => {
    const newText = prompt("Edit task:", text);
    if (newText !== null) {
      dispatch(editTask({ id, text: newText }));
    }
  };

  return (
    <div className="container">
      <h1 className="h">TODO LIST</h1>
      <div className="input-group">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="list-item">
            <span>{task.text}</span>
            <div>
              <button
                onClick={() => handleEditTask(task.id, task.text)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
