# Конфигурация ESLint и Prettier

## Обзор

Проект использует единую конфигурацию ESLint и Prettier для всех модулей (host, react-remote, vue-remote, angular-remote).

## Конфигурационные файлы

### ESLint

- **`.eslintrc.json`** - основная конфигурация ESLint
- **`.eslintignore`** - файлы и директории, исключенные из проверки

### Prettier

- **`.prettierrc`** - настройки форматирования
- **`.prettierignore`** - файлы, исключенные из форматирования

## Правила ESLint

### Базовые правила

- **Airbnb** - основной стиль кода
- **Airbnb Hooks** - правила для React Hooks
- **Prettier** - интеграция с Prettier

### TypeScript правила

- **Airbnb TypeScript** - правила для TypeScript
- **@typescript-eslint/recommended** - рекомендуемые правила TypeScript
- Отключены правила, вызывающие проблемы:
  - `import/no-named-as-default` - отключено для избежания циклических зависимостей
  - `@typescript-eslint/no-var-requires` - отключено для webpack.config.js

### Vue правила

- **Vue 3 Recommended** - правила для Vue 3
- `vue/multi-word-component-names` - отключено
- `vue/require-default-prop` - отключено

## Настройки Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "auto",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "quoteProps": "as-needed"
}
```

## Поддерживаемые файлы

### ESLint проверяет:

- `.js`, `.jsx` - JavaScript и JSX
- `.ts`, `.tsx` - TypeScript и TSX
- `.vue` - Vue компоненты

### Prettier форматирует:

- `.js`, `.jsx`, `.ts`, `.tsx` - JavaScript/TypeScript
- `.vue` - Vue компоненты
- `.json`, `.css`, `.scss`, `.md` - другие файлы

## TypeScript конфигурации

ESLint использует следующие tsconfig.json файлы:

- `./host/tsconfig.json`
- `./react-remote/tsconfig.json`
- `./angular-remote/tsconfig.json`

## Команды

### Корневой package.json

```bash
# Проверка всех файлов
npm run lint

# Автоисправление
npm run lint:fix

# Форматирование
npm run format

# Проверка форматирования
npm run format:check

# Проверка и форматирование
npm run check

# Исправление и форматирование
npm run fix
```

### Модули

Каждый модуль имеет свои команды:

- `npm run lint` - проверка ESLint
- `npm run lint:fix` - автоисправление ESLint
- `npm run format` - форматирование Prettier

## Исключения

### ESLint игнорирует:

- `node_modules/`
- `dist/`, `build/`
- `*.min.js`
- `webpack.config.js`
- `*.config.js`
- `public/`
- `*.html`

### Prettier игнорирует:

- `node_modules/`
- `dist/`, `build/`
- `coverage/`
- `*.min.js`
- `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- `.git/`
- `.vscode/`

## VS Code интеграция

Настройки в `.vscode/settings.json`:

- Автоформатирование при сохранении
- ESLint автоисправление при сохранении
- Prettier как форматтер по умолчанию
- Рабочие директории для всех модулей

## Особенности конфигурации

### React

- `react/react-in-jsx-scope` - отключено (новый JSX transform)
- `react/jsx-filename-extension` - разрешены `.jsx` и `.tsx`
- `react/function-component-definition` - требуются arrow functions

### TypeScript

- `@typescript-eslint/explicit-module-boundary-types` - отключено
- `@typescript-eslint/no-explicit-any` - предупреждение
- `createDefaultProgram: true` - для работы с несколькими tsconfig.json

### Импорты

- Расширения файлов не требуются в импортах
- `import/prefer-default-export` - отключено
- `import/no-unresolved` - отключено (для Module Federation)

## Рекомендации

1. **Всегда запускайте `npm run lint:fix` перед коммитом**
2. **Используйте `npm run format` для форматирования кода**
3. **Проверяйте код в каждом модуле отдельно при необходимости**
4. **Используйте VS Code с установленными расширениями ESLint и Prettier**

## Устранение проблем

### Ошибка "Maximum call stack size exceeded"

- Убедитесь, что `import/no-named-as-default` отключено
- Проверьте, что `createDefaultProgram: true` установлено в parserOptions

### Проблемы с разрешением путей TypeScript

- Убедитесь, что все tsconfig.json файлы указаны в `parserOptions.project`
- Проверьте, что `tsconfigRootDir` установлен правильно

### Конфликты между ESLint и Prettier

- Убедитесь, что `eslint-config-prettier` установлен
- Проверьте порядок extends в конфигурации (prettier должен быть последним)
