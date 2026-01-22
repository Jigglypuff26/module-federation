# ESLint и Prettier Configuration

> **Быстрый старт:** См. [GETTING_STARTED_LINTING.md](GETTING_STARTED_LINTING.md)  
> **Команды:** См. [LINTING_CHEATSHEET.md](LINTING_CHEATSHEET.md)

## Настройки

Проект настроен с использованием современных стандартов **Airbnb** для JavaScript, TypeScript, React, Vue и Angular.

### Конфигурационные файлы

- `.eslintrc.json` - основная конфигурация ESLint
- `.prettierrc` - настройки Prettier
- `.eslintignore` - файлы, игнорируемые ESLint
- `.prettierignore` - файлы, игнорируемые Prettier
- `.vscode/settings.json` - настройки VS Code для автоматического форматирования

### Правила

#### Общие правила

- Используется Airbnb style guide
- Prettier интегрирован с ESLint
- Автоматическое форматирование при сохранении (в VS Code)
- Поддержка React, Vue, TypeScript и Angular

#### Специфичные правила для React

- `react/react-in-jsx-scope: off` - не требуется импорт React в новых версиях
- `react/function-component-definition` - компоненты должны быть стрелочными функциями
- `react/jsx-filename-extension` - JSX разрешен в `.jsx` и `.tsx` файлах

#### Специфичные правила для TypeScript

- `@typescript-eslint/no-explicit-any: warn` - предупреждение при использовании `any`
- `@typescript-eslint/explicit-module-boundary-types: off` - не требуется явное указание типов возвращаемых значений

#### Специфичные правила для Vue

- `vue/multi-word-component-names: off` - разрешены однословные имена компонентов
- `vue/require-default-prop: off` - не требуется default для props

## Использование

### Основные команды

```bash
# Проверить код (ESLint + Prettier)
npm run check

# Исправить все проблемы (ESLint + Prettier)
npm run fix

# Отдельные команды
npm run lint          # Проверить только ESLint
npm run lint:fix      # Исправить только ESLint
npm run format        # Отформатировать только Prettier
```

Подробнее о командах: [LINTING_CHEATSHEET.md](LINTING_CHEATSHEET.md)

## VS Code

### Рекомендуемые расширения

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - для Vue 3

### Настройки

Настройки уже сконфигурированы в `.vscode/settings.json`:

- Автоматическое форматирование при сохранении
- Автоматическое исправление ESLint ошибок при сохранении
- Prettier как форматтер по умолчанию

## Pre-commit Hooks (опционально)

Для настройки автоматической проверки перед коммитом можно установить Husky и lint-staged:

```bash
npm install --save-dev husky lint-staged

# Инициализация Husky
npx husky install
npm pkg set scripts.prepare="husky install"

# Добавление pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

Добавьте в `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.vue": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

## Настройки Prettier

```json
{
  "semi": true, // Точка с запятой в конце строк
  "trailingComma": "es5", // Завершающие запятые (ES5)
  "singleQuote": true, // Одинарные кавычки
  "printWidth": 100, // Максимальная длина строки
  "tabWidth": 2, // Ширина таба
  "useTabs": false, // Использовать пробелы вместо табов
  "arrowParens": "always", // Скобки вокруг параметров стрелочных функций
  "endOfLine": "auto", // Автоматическое определение окончаний строк
  "bracketSpacing": true, // Пробелы в объектных литералах
  "jsxSingleQuote": false, // Двойные кавычки в JSX
  "quoteProps": "as-needed" // Кавычки в свойствах объектов по необходимости
}
```

## Troubleshooting

### ESLint не работает в VS Code

1. Убедитесь, что установлено расширение ESLint
2. Перезагрузите VS Code
3. Проверьте вывод ESLint: `View` → `Output` → выберите `ESLint` из выпадающего списка

### Prettier не форматирует при сохранении

1. Убедитесь, что установлено расширение Prettier
2. Проверьте настройки VS Code: `"editor.formatOnSave": true`
3. Убедитесь, что Prettier установлен как форматтер по умолчанию

### Конфликты между ESLint и Prettier

Конфигурация уже настроена для работы вместе через `eslint-config-prettier`, который отключает все правила ESLint, конфликтующие с Prettier.
