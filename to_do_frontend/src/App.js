import React, { useState } from 'react';
import './App.css';

// Color palette from requirements
const COLORS = {
  primary: '#1976d2',
  secondary: '#424242',
  accent: '#388e3c',
};

// PUBLIC_INTERFACE
function App() {
  /** Main To-Do Application Single-Page Layout.
   *
   * Features:
   * - Add new task (input at top)
   * - Task list with check & delete
   * - Mark as completed
   * - Delete task
   * - Minimalistic, light theme
   */
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // PUBLIC_INTERFACE
  const handleInputChange = (e) => setInput(e.target.value);

  // PUBLIC_INTERFACE
  const handleAddTask = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    setTasks([...tasks, { id: Date.now(), text: val, completed: false }]);
    setInput('');
  };

  // PUBLIC_INTERFACE
  const handleToggle = (id) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-root">
      <main className="todo-container">
        <h1 className="todo-title">To-Do List</h1>
        <form className="todo-input-form" onSubmit={handleAddTask}>
          <input
            className="todo-input"
            aria-label="Add a new task"
            value={input}
            onChange={handleInputChange}
            placeholder="What needs to be done?"
            autoFocus
            maxLength={80}
            style={{
              borderColor: COLORS.primary,
              color: COLORS.primary,
            }}
          />
          <button
            className="todo-add-btn"
            type="submit"
            aria-label="Add task"
            style={{
              backgroundColor: COLORS.primary,
              color: '#fff'
            }}
          >Add</button>
        </form>
        <ul className="todo-list">
          {tasks.length === 0 && (
            <li className="todo-empty">No tasks yet — enjoy your day!</li>
          )}
          {tasks.map(({ id, text, completed }) => (
            <li
              key={id}
              className={`todo-item${completed ? ' completed' : ''}`}
              style={{
                borderColor: COLORS.secondary,
                background:
                  completed
                    ? '#f5fff7'
                    : '#fff'
              }}
            >
              <label className="todo-checkbox-label">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleToggle(id)}
                  aria-label={completed ? 'Mark incomplete' : 'Mark completed'}
                  className="todo-checkbox"
                  style={{
                    accentColor: COLORS.accent
                  }}
                />
                <span className="todo-task-text">{text}</span>
              </label>
              <button
                className="todo-delete-btn"
                aria-label="Delete"
                title="Delete task"
                onClick={() => handleDelete(id)}
                style={{
                  color: COLORS.secondary,
                  borderColor: COLORS.secondary
                }}
              >
                &#x2715;
              </button>
            </li>
          ))}
        </ul>
        <footer className="todo-footer">
          <span className="todo-count">
            {tasks.filter(t => !t.completed).length} left
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
