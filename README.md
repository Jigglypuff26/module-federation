# Micro Frontend with Module Federation

Пример реализации микрофронтенд архитектуры с использованием Webpack Module Federation, объединяющий три разных фреймворка в одном приложении.

## 📋 Описание

Проект демонстрирует интеграцию трех популярных фреймворков (React, Vue, Angular) через Module Federation:

- **Host Application** (React) - главное приложение на порту 3000
- **React Remote** - микрофронтенд на React (порт 3001)
- **Vue Remote** - микрофронтенд на Vue 3 (порт 3002)
- **Angular Remote** - микрофронтенд на Angular 17 с Angular Elements (порт 3003)

### Технологический стек

- **Module Federation**: `@module-federation/enhanced` v0.2.3
- **React**: v18.2.0
- **Vue**: v3.3.11
- **Angular**: v17.3.12 (с Angular Elements)
- **Webpack**: v5.89.0
- **TypeScript**: v5.2.2+

### Особенности

✅ Динамическая загрузка микрофронтендов  
✅ Shared dependencies между приложениями  
✅ Angular Elements (Web Components) для фреймворк-агностичной интеграции  
✅ Hot Module Replacement для быстрой разработки  
✅ TypeScript поддержка

## 🚀 Быстрый старт

### Требования

- Node.js >= 16.x
- npm >= 8.x

### Установка зависимостей

```bash
# Установка зависимостей для всех приложений
npm install

# Или установка для каждого приложения отдельно
cd host && npm install
cd react-remote && npm install
cd vue-remote && npm install
cd angular-remote && npm install
```

### Запуск в режиме разработки

#### Windows (PowerShell) - Рекомендуется

```powershell
# Запустить все приложения в отдельных окнах (удобно для разработки)
.\scripts\start-dev.ps1

# Или запустить в фоновом режиме
.\scripts\start.ps1

# Остановить все приложения
.\scripts\stop.ps1
```

#### Windows (Command Prompt)

```cmd
# Запустить все приложения
scripts\start.bat

# Остановить все приложения
scripts\stop.bat
```

#### Linux/Mac

```bash
# Запустить все приложения (с tmux или в фоновом режиме)
./scripts/start.sh

# Остановить все приложения
./scripts/stop.sh
```

#### Ручной запуск (все платформы)

Откройте 4 отдельных терминала:

```bash
# Terminal 1 - React Remote
cd react-remote && npm start

# Terminal 2 - Vue Remote
cd vue-remote && npm start

# Terminal 3 - Angular Remote
cd angular-remote && npm start

# Terminal 4 - Host
cd host && npm start
```

### Доступ к приложениям

После запуска откройте в браузере:

- **Host Application**: http://localhost:3000
  - Главная страница: http://localhost:3000/
  - React Remote: http://localhost:3000/react
  - Vue Remote: http://localhost:3000/vue
  - Angular Remote: http://localhost:3000/angular

- **Standalone приложения**:
  - React Remote: http://localhost:3001
  - Vue Remote: http://localhost:3002
  - Angular Remote: http://localhost:3003

## 💻 Разработка

### Code Quality - ESLint и Prettier

Проект настроен с современными стандартами **Airbnb** для всех фреймворков.

📚 **[Документация по линтингу](docs/README.md)**

- 🚀 [Быстрый старт](docs/GETTING_STARTED_LINTING.md) - Настройка за 5 минут
- ⚡ [Шпаргалка команд](docs/LINTING_CHEATSHEET.md) - Все команды и правила
- 📖 [Полная документация](docs/LINTING.md) - Настройки и troubleshooting
- 💡 [Примеры правил](docs/ESLINT_RULES_EXAMPLES.md) - Примеры кода

#### Быстрые команды

```bash
# Проверка кода (ESLint + Prettier) - рекомендуется
npm run check

# Исправить все проблемы (ESLint + Prettier) - рекомендуется
npm run fix

# Отдельные команды
npm run lint          # Проверить только ESLint
npm run lint:fix      # Исправить только ESLint
npm run format        # Отформатировать только Prettier
```

📋 [Полный список команд](docs/LINTING_CHEATSHEET.md)

#### Автоматическое форматирование в VS Code

- Установите рекомендуемые расширения (ESLint, Prettier, Volar)
- Форматирование происходит автоматически при сохранении файла
- ESLint исправляет ошибки автоматически при сохранении

### Скрипты запуска

Все скрипты находятся в папке `scripts/`. Подробная документация: [`scripts/README.md`](scripts/README.md)

**Быстрый старт:**

- Windows: `.\scripts\start-dev.ps1`
- Linux/Mac: `./scripts/start.sh`

### Структура проекта

```
module-federation/
├── scripts/                   # Скрипты запуска
│   ├── start-dev.ps1         # PowerShell (отдельные окна)
│   ├── start.ps1             # PowerShell (фоновый режим)
│   ├── start.bat             # Windows CMD
│   ├── start.sh              # Linux/Mac
│   ├── stop.ps1              # Остановка (PowerShell)
│   ├── stop.bat              # Остановка (CMD)
│   ├── stop.sh               # Остановка (Linux/Mac)
│   └── README.md             # Документация скриптов
│
├── host/                      # Host приложение (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AngularWrapper.jsx
│   │   │   └── VueWrapper.jsx
│   │   ├── App.jsx
│   │   ├── bootstrap.jsx
│   │   └── index.js
│   ├── package.json
│   └── webpack.config.js
│
├── react-remote/              # React микрофронтенд
│   ├── src/
│   │   ├── App.jsx
│   │   └── bootstrap.jsx
│   ├── package.json
│   └── webpack.config.js
│
├── vue-remote/                # Vue микрофронтенд
│   ├── src/
│   │   ├── App.vue
│   │   └── bootstrap.js
│   ├── package.json
│   └── webpack.config.js
│
└── angular-remote/            # Angular микрофронтенд
    ├── src/
    │   ├── app/
    │   │   ├── app-element.ts      # Web Component wrapper
    │   │   ├── app.module.ts       # Angular модуль
    │   │   └── app.component.ts    # Компонент
    │   ├── bootstrap.ts
    │   └── main.ts
    ├── package.json
    ├── tsconfig.json
    └── webpack.config.js
```

### Конфигурация Module Federation

#### Host (webpack.config.js)

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    reactRemote: 'reactRemote@http://localhost:3001/remoteEntry.js',
    vueRemote: 'vueRemote@http://localhost:3002/remoteEntry.js',
    angularRemote: 'angularRemote@http://localhost:3003/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
    vue: { singleton: true, eager: true },
    'zone.js': { singleton: true, eager: true },
    'reflect-metadata': { singleton: true, eager: true },
  },
});
```

#### Remote приложения

Каждое remote приложение экспортирует свои модули:

```javascript
// React Remote
exposes: {
  './App': './src/App.jsx',
}

// Vue Remote
exposes: {
  './App': './src/App.vue',
}

// Angular Remote
exposes: {
  './AppElement': './src/app/app-element.ts',
}
```

### Добавление нового микрофронтенда

1. Создайте новую папку для вашего приложения
2. Настройте `webpack.config.js` с `ModuleFederationPlugin`
3. Укажите `exposes` для модулей, которые хотите экспортировать
4. Добавьте remote в конфигурацию host приложения
5. Создайте wrapper компонент в host (если необходимо)

### Особенности Angular интеграции

Angular использует Angular Elements (Web Components) для интеграции:

```typescript
// angular-remote/src/app/app-element.ts
import 'reflect-metadata'; // Для DI
import 'zone.js'; // Для change detection
import '@angular/compiler'; // Для JIT компиляции

export const angularElementReady = (async () => {
  await platformBrowserDynamic().bootstrapModule(AppModule);
})();
```

```typescript
// angular-remote/src/app/app.module.ts
export class AppModule implements DoBootstrap {
  constructor(@Inject(Injector) private injector: Injector) {}

  ngDoBootstrap(): void {
    const element = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('angular-app-element', element);
  }
}
```

### Hot Module Replacement

- **React**: HMR включен по умолчанию
- **Vue**: HMR работает с `vue-loader`
- **Angular**: HMR отключен (`hot: false`) для стабильности

### Production Build

```bash
# Сборка всех приложений
npm run build

# Или для каждого приложения отдельно
cd host && npm run build
cd react-remote && npm run build
cd vue-remote && npm run build
cd angular-remote && npm run build
```

Собранные файлы будут в папке `dist/` каждого приложения.

### Запуск production сборки

```bash
# Установите serve глобально (если еще не установлен)
npm install -g serve

# Запустите каждое приложение
cd host/dist && serve -p 3000
cd react-remote/dist && serve -p 3001
cd vue-remote/dist && serve -p 3002
cd angular-remote/dist && serve -p 3003
```

## 🔧 Troubleshooting

### Angular не загружается

1. Убедитесь, что Angular Remote запущен на порту 3003
2. Проверьте доступность http://localhost:3003/remoteEntry.js
3. Очистите кеш браузера (Ctrl+Shift+R)
4. Проверьте консоль на ошибки Module Federation

### Ошибки CORS

Все приложения настроены с заголовками CORS:

```javascript
headers: {
  'Access-Control-Allow-Origin': '*',
}
```

### Конфликты версий

Используйте `strictVersion: false` для shared dependencies:

```javascript
shared: {
  react: {
    singleton: true,
    strictVersion: false
  }
}
```

## 📚 Дополнительные материалы

- [Module Federation Documentation](https://module-federation.io/)
- [Webpack 5 Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Angular Elements Guide](https://angular.io/guide/elements)
- [Vue 3 Documentation](https://vuejs.org/)
- [React Documentation](https://react.dev/)

## 📄 Лицензия

MIT

## 🤝 Contributing

Pull requests приветствуются. Для больших изменений сначала откройте issue для обсуждения.
