# 🚀 Advanced Module Federation Guide

## 📘 Продвинутые возможности

### 🔧 Настройка Module Federation

#### 1. Singleton Dependencies

```javascript
shared: {
  react: {
    singleton: true,  // Только одна версия React в приложении
    requiredVersion: '^18.2.0',
    eager: true,  // Загружать сразу, не лениво
  }
}
```

**Когда использовать:**
- Библиотеки с глобальным состоянием (React, Vue)
- Библиотеки, которые не должны дублироваться

#### 2. Версии зависимостей

```javascript
shared: {
  lodash: {
    requiredVersion: '^4.17.0',  // Минимальная версия
    strictVersion: true,  // Строгое соответствие версии
  }
}
```

#### 3. Eager vs Lazy Loading

**Eager** (в Host):
```javascript
shared: {
  react: {
    singleton: true,
    eager: true,  // Загружается сразу с host
  }
}
```

**Lazy** (в Remote - по умолчанию):
```javascript
shared: {
  'some-library': {
    // Загружается по требованию
  }
}
```

### 🎯 Dynamic Remotes

Загрузка удаленных модулей динамически:

```javascript
// В host приложении
const loadRemote = (scope, module) => {
  return async () => {
    await __webpack_init_sharing__('default');
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  };
};

// Использование
const RemoteApp = React.lazy(
  loadRemote('myRemoteApp', './App')
);
```

### 📦 Exposing Multiple Modules

В remote приложении можно экспортировать несколько модулей:

```javascript
exposes: {
  './App': './src/App',
  './Button': './src/components/Button',
  './Header': './src/components/Header',
  './utils': './src/utils/helpers',
}
```

Использование в Host:

```javascript
import Button from 'reactRemote/Button';
import Header from 'reactRemote/Header';
import { formatDate } from 'reactRemote/utils';
```

### 🔄 Runtime Configuration

Настройка URL удаленных модулей во время выполнения:

```javascript
// webpack.config.js в Host
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    reactRemote: `reactRemote@${getRemoteUrl('reactRemote')}`,
  },
});

// Функция для получения URL из переменных окружения
function getRemoteUrl(remoteName) {
  if (process.env.NODE_ENV === 'production') {
    return process.env[`${remoteName.toUpperCase()}_URL`];
  }
  return `http://localhost:${getPortForRemote(remoteName)}/remoteEntry.js`;
}
```

### 🛡️ Error Handling

Обработка ошибок при загрузке remote модулей:

```javascript
import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Failed to load remote module</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Использование
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <RemoteComponent />
  </Suspense>
</ErrorBoundary>
```

### 🌐 Production Deployment

#### Netlify / Vercel

**host/webpack.config.js:**
```javascript
output: {
  publicPath: process.env.PUBLIC_URL || 'auto',
}
```

**Environment Variables:**
```
REACT_REMOTE_URL=https://react-remote.netlify.app/remoteEntry.js
VUE_REMOTE_URL=https://vue-remote.vercel.app/remoteEntry.js
```

#### Docker

**Dockerfile для каждого приложения:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  host:
    build: ./host
    ports:
      - "3000:3000"
  react-remote:
    build: ./react-remote
    ports:
      - "3001:3001"
  vue-remote:
    build: ./vue-remote
    ports:
      - "3002:3002"
  angular-remote:
    build: ./angular-remote
    ports:
      - "3003:3003"
```

### 🔐 Authentication между Micro-frontends

Использование shared хранилища для auth токенов:

```javascript
// В shared модуле
export class AuthService {
  static token = null;
  
  static setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }
  
  static getToken() {
    return this.token || localStorage.getItem('auth_token');
  }
}

// Экспорт в Module Federation
exposes: {
  './AuthService': './src/services/AuthService',
}

// Использование в других приложениях
import { AuthService } from 'host/AuthService';
```

### 📊 Performance Optimization

#### 1. Preload критичных модулей

```javascript
// В index.html
<link rel="preload" 
      href="http://localhost:3001/remoteEntry.js" 
      as="script">
```

#### 2. Code Splitting внутри Remote

```javascript
// В remote приложении
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

#### 3. Shared Dependencies Caching

```javascript
shared: {
  react: {
    singleton: true,
    shareScope: 'default',
    version: '18.2.0',
  }
}
```

### 🧪 Testing

#### Unit Tests

```javascript
// Mock удаленных модулей
jest.mock('reactRemote/App', () => {
  return () => <div>Mocked Remote App</div>;
});
```

#### E2E Tests (Cypress)

```javascript
describe('Module Federation', () => {
  it('loads remote applications', () => {
    cy.visit('http://localhost:3000');
    cy.contains('React App').click();
    cy.url().should('include', '/react');
    cy.contains('React Remote Application');
  });
});
```

### 📈 Monitoring

Отслеживание загрузки модулей:

```javascript
// В host приложении
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetching:', args[0]);
  return originalFetch.apply(this, args);
};
```

### 🎨 Type Safety (TypeScript)

**Создание типов для remote модулей:**

```typescript
// types/remote.d.ts
declare module 'reactRemote/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'vueRemote/App' {
  import { DefineComponent } from 'vue';
  const App: DefineComponent;
  export default App;
}
```

### 🔄 Hot Module Replacement

Настройка HMR для разработки:

```javascript
// webpack.config.js
devServer: {
  hot: true,
  liveReload: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}

// В приложении
if (module.hot) {
  module.hot.accept();
}
```

## 📚 Полезные ссылки

- [Module Federation Official Docs](https://module-federation.io/)
- [Webpack 5 Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Practical Module Federation](https://module-federation.io/guide/start/index.html)
- [@module-federation/enhanced](https://www.npmjs.com/package/@module-federation/enhanced)

## 💡 Best Practices

1. ✅ Всегда используйте `singleton: true` для фреймворков
2. ✅ Используйте Error Boundaries для remote компонентов
3. ✅ Версионируйте remote модули
4. ✅ Настройте proper CORS headers
5. ✅ Используйте TypeScript для type safety
6. ✅ Мониторьте загрузку модулей в production
7. ✅ Тестируйте независимо каждый micro-frontend
8. ✅ Используйте environment variables для URLs
