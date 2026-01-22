import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Module Federation', completed: true },
    { id: 2, text: 'Build micro-frontends', completed: false },
    { id: 3, text: 'Deploy to production', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="react-app">
      <div className="card">
        <h2>⚛️ React Remote Application</h2>
        <p>This is an independent React micro-frontend</p>

        <div className="todo-app">
          <h3>Todo List Demo</h3>
          <div className="input-group">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new todo..."
            />
            <button type="button" onClick={addTodo}>
              Add
            </button>
          </div>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleTodo(todo.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleTodo(todo.id);
                    }
                  }}
                >
                  {todo.text}
                </span>
                <button type="button" onClick={() => removeTodo(todo.id)}>
                  ×
                </button>
              </li>
            ))}
          </ul>

          <div className="stats">
            Total: {todos.length} | Completed: {completedCount} | Active: {activeCount}
          </div>
        </div>

        <div className="info">
          <h3>📦 Module Federation Info</h3>
          <ul>
            <li>Port: 3001</li>
            <li>Framework: React 18</li>
            <li>Exposed Module: ./App</li>
            <li>Shared: react, react-dom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
