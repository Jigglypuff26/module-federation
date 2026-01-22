# ESLint & Prettier - Шпаргалка

Быстрый справочник по командам и настройкам линтера.

## 🚀 Быстрый старт

```bash
# 1. Установить зависимости
npm install && npm run install:all

# 2. Проверить код (ESLint + Prettier)
npm run check

# 3. Исправить все проблемы (ESLint + Prettier)
npm run fix
```

## 📝 Основные команды

### ⭐ Рекомендуемые (общие команды)

```bash
npm run check         # Проверить ESLint + Prettier (без изменений)
npm run fix           # Исправить ESLint + отформатировать Prettier
```

### Отдельные команды

```bash
npm run lint          # Проверить только ESLint
npm run lint:fix      # Исправить только ESLint
npm run format        # Отформатировать только Prettier
npm run format:check  # Проверить форматирование (без изменений)
```

### Альтернативные названия

```bash
npm run lint:all      # То же что и check
npm run fix:all       # То же что и fix
```

### Для конкретного приложения

```bash
# Host
cd host && npm run lint
cd host && npm run lint:fix
cd host && npm run format

# React Remote
cd react-remote && npm run lint
cd react-remote && npm run lint:fix

# Vue Remote
cd vue-remote && npm run lint
cd vue-remote && npm run lint:fix

# Angular Remote
cd angular-remote && npm run lint
cd angular-remote && npm run lint:fix
```

## 🔧 VS Code

### Горячие клавиши

| Действие                  | Клавиши         |
| ------------------------- | --------------- |
| Сохранить + форматировать | `Ctrl+S`        |
| Форматировать документ    | `Shift+Alt+F`   |
| Форматировать выделенное  | `Ctrl+K Ctrl+F` |
| Command Palette           | `Ctrl+Shift+P`  |

### Полезные команды (Ctrl+Shift+P)

- `Format Document` - отформатировать файл
- `Format Selection` - отформатировать выделенное
- `ESLint: Fix all auto-fixable Problems` - исправить ESLint
- `ESLint: Restart ESLint Server` - перезапустить

## 📋 Правила Airbnb (кратко)

### Именование

```javascript
// ✅ Good
const userName = 'John'; // camelCase для переменных
const getUserData = () => {}; // camelCase для функций
const UserProfile = () => {}; // PascalCase для компонентов

// ❌ Bad
const user_name = 'John';
const UserProfile_Component = () => {};
```

### Кавычки

```javascript
// ✅ Good
const name = 'John'; // Одинарные в JS
const jsx = <div className="box" />; // Двойные в JSX

// ❌ Bad
const name = 'John';
const jsx = <div className="box" />;
```

### Функции

```javascript
// ✅ Good - стрелочные функции
const Component = () => {};
const sum = (a, b) => a + b;

// ❌ Bad - обычные функции для компонентов
function Component() {}
```

### Импорты

```javascript
// ✅ Good - без расширений
import Button from './Button';
import { useState } from 'react';

// ❌ Bad
import Button from './Button.jsx';
```

### Console

```javascript
// ✅ Good - только warn/error
console.warn('Warning');
console.error('Error');

// ❌ Bad - вызовет предупреждение
console.log('Debug');

// ⚠️ Исключение
// eslint-disable-next-line no-console
console.log('Allowed once');
```

## 🎨 Prettier настройки

```json
{
  "semi": true, // ; в конце
  "singleQuote": true, // ' вместо "
  "trailingComma": "es5", // запятые в конце
  "printWidth": 100, // макс. длина строки
  "tabWidth": 2, // 2 пробела
  "arrowParens": "always" // скобки в =>
}
```

## 🔍 Отключение правил

### Одна строка

```javascript
console.log('test'); // eslint-disable-line no-console
```

### Следующая строка

```javascript
// eslint-disable-next-line no-console
console.log('test');
```

### Блок кода

```javascript
/* eslint-disable no-console */
console.log('line 1');
console.log('line 2');
/* eslint-enable no-console */
```

### Весь файл

```javascript
/* eslint-disable no-console */
// Весь файл без проверки console
```

## 🐛 Быстрые исправления

### ESLint не работает

```bash
# Очистить кеш
rm -rf .eslintcache node_modules/.cache

# Переустановить
npm install
```

### Prettier не форматирует

```bash
# Проверить вручную
npx prettier --check "src/**/*.js"

# Отформатировать вручную
npx prettier --write "src/**/*.js"
```

### Перезапустить ESLint в VS Code

1. `Ctrl+Shift+P`
2. `ESLint: Restart ESLint Server`

## 📁 Важные файлы

| Файл                    | Описание              |
| ----------------------- | --------------------- |
| `.eslintrc.json`        | Конфигурация ESLint   |
| `.prettierrc`           | Конфигурация Prettier |
| `.eslintignore`         | Игнорируемые файлы    |
| `.editorconfig`         | Настройки редактора   |
| `.vscode/settings.json` | VS Code настройки     |

## 🎯 Pre-commit hooks

```bash
# Установка
npm i -D husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"

# Теперь при git commit автоматически:
# 1. Проверка кода
# 2. Форматирование
# 3. Исправление ошибок
```

## 📊 GitHub Actions

Автоматически при push/PR:

```yaml
# .github/workflows/lint.yml
- npm run lint
- prettier --check "**/*.{js,jsx,ts,tsx,vue}"
```

## 🎓 Документация

| Файл                         | Содержание          |
| ---------------------------- | ------------------- |
| `GETTING_STARTED_LINTING.md` | Быстрый старт       |
| `LINTING_CHEATSHEET.md`      | Эта шпаргалка       |
| `LINTING.md`                 | Полная документация |
| `ESLINT_RULES_EXAMPLES.md`   | Примеры кода        |

## 🔗 Полезные ссылки

- [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 💡 Советы

1. **Сохраняйте чаще** - автоформатирование при `Ctrl+S`
2. **Используйте lint:fix** - быстро исправляет большинство ошибок
3. **Читайте сообщения** - ESLint объясняет каждую ошибку
4. **Настройте pre-commit** - предотвращает коммиты с ошибками
5. **Следуйте стандартам** - код будет чище и понятнее

---

**Сохраните эту шпаргалку в закладки!** 📌
