# 🔧 Troubleshooting Guide

## ❌ Распространенные проблемы и решения

### 🚫 Проблема 1: "Cannot read property 'call' of undefined"

**Причина:** Host пытается загрузить remote модуль, который еще не запущен.

**Решение:**
```bash
# Убедитесь, что ВСЕ remote приложения запущены:
# 1. Запустите remotes
npm run start:react    # Terminal 1
npm run start:vue      # Terminal 2
npm run start:angular  # Terminal 3

# 2. Только потом запустите host
npm run start:host     # Terminal 4
```

---

### 🚫 Проблема 2: "Shared module is not available for eager consumption"

**Причина:** Неправильная настройка `eager` и `singleton` в shared dependencies.

**Решение в host/webpack.config.js:**
```javascript
shared: {
  react: {
    singleton: true,
    eager: true,  // Добавьте eager: true в Host
  },
}
```

**Также убедитесь, что используете bootstrap паттерн:**
```javascript
// index.js
import('./bootstrap');

// bootstrap.jsx (или bootstrap.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
// ... остальной код
```

---

### 🚫 Проблема 3: CORS ошибки

**Ошибка:**
```
Access to fetch at 'http://localhost:3001/remoteEntry.js' 
has been blocked by CORS policy
```

**Решение в webpack.config.js каждого приложения:**
```javascript
devServer: {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
}
```

---

### 🚫 Проблема 4: Порт уже занят

**Ошибка:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Решение для Windows:**
```powershell
# Найти процесс на порту
netstat -ano | findstr :3000

# Убить процесс (замените PID на найденный)
taskkill /PID <PID> /F
```

**Решение для Linux/Mac:**
```bash
# Найти процесс
lsof -i :3000

# Убить процесс
kill -9 <PID>
```

**Или измените порт в webpack.config.js:**
```javascript
devServer: {
  port: 3005,  // Новый порт
}
```

---

### 🚫 Проблема 5: Module not found после установки

**Причина:** Зависимости не установлены или установлены неправильно.

**Решение:**
```bash
# Удалите все node_modules и lock файлы
rm -rf node_modules package-lock.json
rm -rf host/node_modules host/package-lock.json
rm -rf react-remote/node_modules react-remote/package-lock.json
rm -rf vue-remote/node_modules vue-remote/package-lock.json
rm -rf angular-remote/node_modules angular-remote/package-lock.json

# Переустановите
npm run install:all
```

---

### 🚫 Проблема 6: "Cannot find module './bootstrap'"

**Причина:** Отсутствует файл bootstrap или неправильный импорт.

**Решение:**

Убедитесь, что есть оба файла:

**index.js:**
```javascript
import('./bootstrap');
```

**bootstrap.jsx:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### 🚫 Проблема 7: Vue приложение не загружается

**Ошибка:**
```
Failed to resolve component: default
```

**Решение в host/src/App.jsx:**

Измените импорт Vue компонента:

```javascript
// ❌ Неправильно
const VueApp = lazy(() => import('vueRemote/App'));

// ✅ Правильно
const VueApp = lazy(() => 
  import('vueRemote/App').then(module => ({
    default: (props) => {
      const { createApp } = require('vue');
      const container = document.createElement('div');
      createApp(module.default).mount(container);
      return container;
    }
  }))
);
```

**Или создайте wrapper компонент:**

```javascript
// host/src/components/VueWrapper.jsx
import { useEffect, useRef } from 'react';
import { createApp } from 'vue';

export function VueWrapper({ component }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const app = createApp(component);
      app.mount(ref.current);
      return () => app.unmount();
    }
  }, [component]);

  return <div ref={ref} />;
}
```

---

### 🚫 Проблема 8: Angular приложение не загружается

**Ошибка:**
```
NullInjectorError: No provider for ApplicationRef
```

**Решение в angular-remote/src/app/app.component.ts:**

Добавьте wrapper для использования в React:

```typescript
// angular-remote/src/bootstrap-wrapper.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export function mount(containerId: string) {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
```

**И экспортируйте в webpack.config.js:**
```javascript
exposes: {
  './App': './src/app/app.component',
  './mount': './src/bootstrap-wrapper',
}
```

---

### 🚫 Проблема 9: "Webpack compilation failed"

**Проверьте:**

1. Синтаксические ошибки в коде
2. Правильность путей в webpack.config.js
3. Установлены ли все devDependencies

**Запустите с подробными логами:**
```bash
npm start -- --stats=verbose
```

---

### 🚫 Проблема 10: Изменения не отображаются (HMR не работает)

**Решение:**

1. Проверьте настройки devServer:
```javascript
devServer: {
  hot: true,
  liveReload: true,
}
```

2. Очистите кеш:
```bash
rm -rf .cache dist node_modules/.cache
npm start
```

3. Hard reload в браузере: `Ctrl+Shift+R` (Windows) или `Cmd+Shift+R` (Mac)

---

### 🚫 Проблема 11: Production build не работает

**Решение:**

1. Проверьте publicPath в production:
```javascript
output: {
  publicPath: process.env.PUBLIC_PATH || 'http://localhost:3000/',
}
```

2. Убедитесь, что URL remote модулей правильные для production:
```javascript
remotes: {
  reactRemote: `reactRemote@${process.env.REACT_REMOTE_URL || 'http://localhost:3001/remoteEntry.js'}`,
}
```

---

### 🚫 Проблема 12: TypeScript ошибки для remote модулей

**Решение - создайте файл типов:**

```typescript
// host/src/types/remotes.d.ts
declare module 'reactRemote/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'vueRemote/App' {
  const App: any;
  export default App;
}

declare module 'angularRemote/App' {
  const App: any;
  export default App;
}
```

---

## 🔍 Полезные команды для отладки

### Проверка работы webpack:
```bash
npx webpack --config webpack.config.js --mode development
```

### Проверка работы dev-server:
```bash
npx webpack serve --mode development --stats=verbose
```

### Проверка доступности remoteEntry.js:
```bash
curl http://localhost:3001/remoteEntry.js
```

### Очистка всего:
```bash
# Удалить все собранные файлы и зависимости
rm -rf dist node_modules .cache
npm install
```

---

## 📞 Получение помощи

Если проблема не решена:

1. Проверьте [официальную документацию](https://module-federation.io/)
2. Посмотрите [примеры на GitHub](https://github.com/module-federation/module-federation-examples)
3. Задайте вопрос в [Discord сообществе](https://discord.gg/module-federation)
4. Откройте issue на [GitHub](https://github.com/module-federation/core/issues)

---

## ✅ Checklist при возникновении проблем

- [ ] Все remote приложения запущены?
- [ ] Порты свободны (3000-3003)?
- [ ] Зависимости установлены (`npm install` в каждой папке)?
- [ ] CORS headers настроены?
- [ ] Bootstrap pattern используется?
- [ ] publicPath правильный?
- [ ] remoteEntry.js доступен по URL?
- [ ] Версии shared библиотек совместимы?
- [ ] Кеш очищен?
- [ ] Браузер обновлен (hard reload)?
