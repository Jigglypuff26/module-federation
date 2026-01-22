import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { text: 'Learn Module Federation', completed: true },
    { text: 'Build micro-frontends', completed: false },
    { text: 'Deploy to production', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const completedCount = todos.filter(t => t.completed).length;
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
            <button onClick={addTodo}>Add</button>
          </div>

          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className={todo.completed ? 'completed' : ''}>
                <span onClick={() => toggleTodo(index)}>{todo.text}</span>
                <button onClick={() => removeTodo(index)}>×</button>
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
