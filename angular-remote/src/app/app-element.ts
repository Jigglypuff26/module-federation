import 'zone.js';
import '@angular/compiler'; // Импортируем компилятор для JIT
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

/**
 * Web Component wrapper для Angular компонента
 * Использует platformBrowserDynamic для JIT-компиляции + ngDoBootstrap
 * Согласно рекомендациям Module Federation и Angular Elements
 */

// Экспортируем промис, который резолвится после bootstrap модуля
// ngDoBootstrap в AppModule автоматически зарегистрирует custom element
export const angularElementReady = (async () => {
  try {
    console.log('🚀 Initializing Angular Web Component with JIT compiler...');
    
    // Загружаем Angular модуль с JIT компилятором
    // ngDoBootstrap() автоматически вызовется и зарегистрирует custom element
    await platformBrowserDynamic().bootstrapModule(AppModule);
    
    console.log('✅ Angular module bootstrapped, Web Component registered via ngDoBootstrap');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Angular Web Component:', error);
    throw error;
  }
})();

// Экспортируем для совместимости
export { AppComponent };
