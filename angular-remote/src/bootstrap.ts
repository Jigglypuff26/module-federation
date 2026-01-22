import 'zone.js';
import { ApplicationRef, createComponent } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap для standalone приложения (http://localhost:3003)
 * Для Web Component используется app-element.ts с ngDoBootstrap
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    // ngDoBootstrap зарегистрирует Web Component, но для standalone 
    // нам нужно вручную создать компонент в <app-root>
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      // Используем новый API createComponent (Angular 13+)
      const componentRef = createComponent(AppComponent, {
        environmentInjector: moduleRef.injector,
        hostElement: appRoot
      });
      
      // Подключаем к ApplicationRef для change detection
      const appRef = moduleRef.injector.get(ApplicationRef);
      appRef.attachView(componentRef.hostView);
      
      console.log('✅ Angular standalone app bootstrapped');
    }
  })
  .catch(err => console.error('❌ Angular bootstrap error:', err));
