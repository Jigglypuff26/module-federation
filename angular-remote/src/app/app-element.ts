// Важно: reflect-metadata должен быть первым!
import 'reflect-metadata';

// Затем zone.js
import 'zone.js';

// Импортируем компилятор для JIT (обязательно для Angular Elements)
import '@angular/compiler';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

/**
 * Web Component wrapper для Angular компонента
 * Использует platformBrowserDynamic для JIT-компиляции + ngDoBootstrap
 * Согласно рекомендациям Module Federation и Angular Elements
 */

let moduleRef = null;
let initializationPromise = null;

// Экспортируем промис, который резолвится после bootstrap модуля
// ngDoBootstrap в AppModule автоматически зарегистрирует custom element
export const angularElementReady = (() => {
  // Предотвращаем множественную инициализацию
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    try {
      console.log('🚀 Initializing Angular Web Component with JIT compiler...');
      console.log('📦 Zone.js loaded:', typeof Zone !== 'undefined');
      console.log('📦 Reflect.metadata available:', typeof Reflect !== 'undefined' && typeof Reflect.getMetadata === 'function');
      
      // Проверяем, не был ли модуль уже загружен
      if (moduleRef) {
        console.log('✅ Angular module already initialized');
        return true;
      }

      // Загружаем Angular модуль с JIT компилятором
      // ngDoBootstrap() автоматически вызовется и зарегистрирует custom element
      moduleRef = await platformBrowserDynamic().bootstrapModule(AppModule, {
        ngZone: 'zone.js', // Явно указываем использование zone.js
      });
      
      console.log('✅ Angular module bootstrapped, Web Component registered via ngDoBootstrap');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Angular Web Component:', error);
      console.error('Error details:', error.stack || error);
      throw error;
    }
  })();

  return initializationPromise;
})();

// Экспортируем для совместимости
export { AppComponent };
