import React, { useState, useEffect } from "react";
import "./App.css";
import { FaTrash, FaCheck, FaLightbulb } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks and dark mode from localStorage on initial render
  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      const storedDarkMode = localStorage.getItem("darkMode");

      if (storedTasks) {
        setTasks(storedTasks);
        console.log("Loaded tasks from localStorage:", storedTasks); // Debug
      }
      if (storedDarkMode !== null) {
        setDarkMode(JSON.parse(storedDarkMode));
        console.log("Loaded dark mode from localStorage:", storedDarkMode); // Debug
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Saved tasks to localStorage:", tasks); // Debug
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  // Save dark mode to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
      console.log("Saved dark mode to localStorage:", darkMode); // Debug
    } catch (error) {
      console.error("Error saving dark mode to localStorage:", error);
    }
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { text: task, category, priority, completed: false },
      ]);
      setTask("");
      setCategory("General");
      setPriority("Medium");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>To-Do List</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"} <FaLightbulb />
        </button>
      </header>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <div>
              <strong>{task.text}</strong> - <em>{task.category}</em>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            <div className="actions">
              <FaCheck
                className="icon completed-icon"
                onClick={() => toggleComplete(index)}
              />
              <FaTrash
                className="icon delete-icon"
                onClick={() => deleteTask(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
