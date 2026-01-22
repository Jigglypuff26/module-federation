# Примеры правил ESLint и Prettier

Этот файл содержит примеры кода, показывающие как применяются правила ESLint и Prettier в проекте.

## 📚 Содержание

- [JavaScript/React правила](#javascriptreact-правила)
- [TypeScript правила](#typescript-правила)
- [Vue правила](#vue-правила)
- [Prettier форматирование](#prettier-форматирование)

---

## JavaScript/React правила

### ✅ Правильно: Стрелочные функции для компонентов

```javascript
// Good
const MyComponent = () => {
  return <div>Hello</div>;
};

// Bad
function MyComponent() {
  return <div>Hello</div>;
}
```

### ✅ Правильно: Одинарные кавычки

```javascript
// Good
const name = 'John';
const greeting = `Hello, ${name}`;

// Bad
const name = 'John';
```

### ✅ Правильно: Импорты без расширений

```javascript
// Good
import Button from './components/Button';
import { useState } from 'react';

// Bad
import Button from './components/Button.jsx';
```

### ✅ Правильно: Деструктуризация props

```javascript
// Good
const UserCard = ({ name, age, email }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{email}</p>
    </div>
  );
};

// Acceptable (когда много props)
const UserCard = (props) => {
  const { name, age, email } = props;
  return <div>...</div>;
};
```

### ✅ Правильно: Именование функций

```javascript
// Good - camelCase для функций
const getUserData = () => {
  /* ... */
};
const handleClick = () => {
  /* ... */
};

// Good - PascalCase для компонентов
const UserProfile = () => {
  /* ... */
};

// Bad
const get_user_data = () => {
  /* ... */
};
const UserProfile_Component = () => {
  /* ... */
};
```

### ✅ Правильно: Использование console

```javascript
// Good - только warn и error разрешены
console.warn('This is a warning');
console.error('This is an error');

// Bad - вызовет предупреждение
console.log('Debug message');

// Исключение: можно отключить для одной строки
// eslint-disable-next-line no-console
console.log('Debug info');
```

### ✅ Правильно: Неиспользуемые переменные

```javascript
// Good - используем _ для игнорируемых параметров
const handleClick = (_event, index) => {
  console.warn('Clicked item:', index);
};

// Good - все переменные используются
const sum = (a, b) => a + b;

// Bad - неиспользуемая переменная
const calculate = (a, b, c) => a + b; // 'c' не используется
```

### ✅ Правильно: Экспорты

```javascript
// Good - именованный экспорт предпочтительнее
export const Button = () => { /* ... */ };
export const Input = () => { /* ... */ };

// Good - default экспорт для главного компонента файла
const App = () => { /* ... */ };
export default App;

// Bad - не требуется default export для единственной функции
export default () => { /* ... */ };
```

---

## TypeScript правила

### ✅ Правильно: Типизация props

```typescript
// Good
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
  return <button onClick={onClick} disabled={disabled}>{text}</button>;
};

// Acceptable - Type alias
type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};
```

### ✅ Правильно: Типизация useState

```typescript
// Good - с явным типом
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// Good - тип выводится автоматически
const [isOpen, setIsOpen] = useState(false); // boolean
const [name, setName] = useState('John'); // string
```

### ✅ Правильно: Типизация функций

```typescript
// Good
const calculateSum = (a: number, b: number): number => {
  return a + b;
};

// Good - возвращаемый тип выводится автоматически
const greet = (name: string) => {
  return `Hello, ${name}`;
};

// Good - асинхронные функции
const fetchData = async (id: string): Promise<Data> => {
  const response = await fetch(`/api/data/${id}`);
  return response.json();
};
```

### ⚠️ Осторожно: Использование any

```typescript
// Bad - избегайте any
const processData = (data: any) => {
  /* ... */
};

// Good - используйте конкретные типы
const processData = (data: User[]) => {
  /* ... */
};

// Good - используйте unknown для неизвестных типов
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
};

// Acceptable - если really необходимо, будет warning
const handleLegacyApi = (response: any) => {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  /* ... */
};
```

### ✅ Правильно: Интерфейсы vs Type Aliases

```typescript
// Good - Interface для объектов
interface User {
  id: string;
  name: string;
  email: string;
}

// Good - Type для union, intersection
type Status = 'active' | 'inactive' | 'pending';
type UserWithStatus = User & { status: Status };

// Good - Type для функций
type EventHandler = (event: Event) => void;
```

---

## Vue правила

### ✅ Правильно: Структура компонента

```vue
<!-- Good -->
<template>
  <div class="user-profile">
    <h1>{{ userName }}</h1>
    <p>{{ userEmail }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile', // Можно однословное имя
  props: {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-profile {
  padding: 20px;
}
</style>
```

### ✅ Правильно: Composition API

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value += 1;
};
</script>
```

### ✅ Правильно: Props без default

```vue
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    // default не требуется для опциональных props
    subtitle: {
      type: String,
    },
  },
};
</script>
```

---

## Prettier форматирование

### ✅ Правильно: Длина строки (100 символов)

```javascript
// Good - автоматически разбивается на несколько строк
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
};

// Good - длинные строки остаются как есть в шаблонах
const message = `This is a very long message that exceeds 100 characters but stays on one line`;
```

### ✅ Правильно: Запятые (ES5 style)

```javascript
// Good - запятая после последнего элемента
const colors = [
  'red',
  'green',
  'blue', // trailing comma
];

const person = {
  name: 'John',
  age: 30,
  city: 'New York', // trailing comma
};

// Bad - будет автоматически добавлена запятая
const colors = ['red', 'green', 'blue'];
```

### ✅ Правильно: Объектные литералы

```javascript
// Good - пробелы внутри фигурных скобок
const obj = { name: 'John', age: 30 };

// Good - без пробелов в пустых объектах
const empty = {};

// Bad - будет автоматически отформатировано
const obj = { name: 'John', age: 30 };
```

### ✅ Правильно: Стрелочные функции

```javascript
// Good - всегда со скобками вокруг параметров
const double = (x) => x * 2;
const sum = (a, b) => a + b;

// Good - многострочное тело
const calculate = (x) => {
  const result = x * 2;
  return result + 10;
};

// Bad - будут добавлены скобки
const double = (x) => x * 2;
```

### ✅ Правильно: JSX

```javascript
// Good - двойные кавычки в JSX
const Button = () => {
  return <button className="btn-primary">Click me</button>;
};

// Good - одинарные кавычки в JS выражениях
const Button = ({ type = 'button' }) => {
  return <button type={type}>Click me</button>;
};
```

---

## 🔧 Автоматическое исправление

Большинство этих правил исправляются автоматически:

```bash
# Исправить все файлы
npm run lint:fix

# Отформатировать все файлы
npm run format
```

## 📖 Дополнительные ресурсы

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [Vue ESLint Rules](https://eslint.vuejs.org/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

**Совет:** Используйте VS Code с расширениями ESLint и Prettier для автоматического форматирования при сохранении файла!
