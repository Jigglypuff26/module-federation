import { DoBootstrap, Injector, NgModule, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

/**
 * AppModule для Angular Elements
 * Использует ngDoBootstrap для регистрации Web Component
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // Не указываем bootstrap, т.к. используем ngDoBootstrap
})
export class AppModule implements DoBootstrap {
  // Явно указываем токен для DI
  constructor(@Inject(Injector) private injector: Injector) {
    console.log('📦 AppModule constructor called');
    console.log('📦 Injector available:', !!injector);
  }

  ngDoBootstrap(): void {
    try {
      console.log('🔧 ngDoBootstrap called - registering Web Component...');

      // Проверяем, не зарегистрирован ли уже элемент
      if (customElements.get('angular-app-element')) {
        console.log('⚠️ angular-app-element already registered, skipping');
        return;
      }

      // Создаём Web Component из Angular компонента
      const angularElement = createCustomElement(AppComponent, { injector: this.injector });

      // Регистрируем custom element
      customElements.define('angular-app-element', angularElement);
      console.log('✅ Angular Web Component "angular-app-element" registered successfully');

      // Проверяем регистрацию
      console.log(
        '✅ Verification: customElements.get("angular-app-element") =',
        !!customElements.get('angular-app-element')
      );
    } catch (error) {
      console.error('❌ Error in ngDoBootstrap:', error);
      throw error;
    }
  }
}
