<template>
  <div class="vue-app">
    <div class="card">
      <h2>💚 Vue Remote Application</h2>
      <p>This is an independent Vue 3 micro-frontend</p>

      <div class="todo-app">
        <h3>Todo List Demo</h3>
        <div class="input-group">
          <input 
            v-model="newTodo" 
            @keyup.enter="addTodo"
            placeholder="Add a new todo..."
          />
          <button @click="addTodo">Add</button>
        </div>

        <ul class="todo-list">
          <li 
            v-for="(todo, index) in todos" 
            :key="index"
            :class="{ completed: todo.completed }"
          >
            <span @click="toggleTodo(index)">{{ todo.text }}</span>
            <button @click="removeTodo(index)">×</button>
          </li>
        </ul>

        <div class="stats">
          Total: {{ todos.length }} | 
          Completed: {{ completedCount }} | 
          Active: {{ activeCount }}
        </div>
      </div>

      <div class="info">
        <h3>📦 Module Federation Info</h3>
        <ul>
          <li>Port: 3002</li>
          <li>Framework: Vue 3</li>
          <li>Exposed Module: ./App</li>
          <li>Shared: vue</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const todos = ref([
      { text: 'Learn Module Federation', completed: true },
      { text: 'Build micro-frontends', completed: false },
      { text: 'Deploy to production', completed: false },
    ]);
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          text: newTodo.value,
          completed: false,
        });
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const completedCount = computed(() => {
      return todos.value.filter(t => t.completed).length;
    });

    const activeCount = computed(() => {
      return todos.value.filter(t => !t.completed).length;
    });

    return {
      todos,
      newTodo,
      addTodo,
      removeTodo,
      toggleTodo,
      completedCount,
      activeCount,
    };
  },
};
</script>

<style scoped>
.vue-app {
  padding: 20px;
}

.card {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  padding: 30px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.3);
}

.card h2 {
  margin-bottom: 10px;
  font-size: 28px;
}

.todo-app {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.input-group input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

.input-group button {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  background: white;
  color: #42b883;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.input-group button:hover {
  transform: scale(1.05);
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.3);
  margin-bottom: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.todo-list li:hover {
  background: rgba(255, 255, 255, 0.4);
}

.todo-list li.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-list li button {
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.todo-list li button:hover {
  background: rgba(255, 0, 0, 0.9);
}

.stats {
  margin-top: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.info {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.info ul {
  list-style: none;
  margin-top: 10px;
  padding: 0;
}

.info li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.info li:last-child {
  border-bottom: none;
}
</style>
