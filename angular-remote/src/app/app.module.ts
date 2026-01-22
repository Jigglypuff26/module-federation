import { DoBootstrap, Injector, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    // Создаём Web Component из Angular компонента
    const angularElement = createCustomElement(AppComponent, { injector: this.injector });
    
    // Регистрируем custom element, если ещё не зарегистрирован
    if (!customElements.get('angular-app-element')) {
      customElements.define('angular-app-element', angularElement);
      console.log('✅ Angular Web Component "angular-app-element" registered via ngDoBootstrap');
    }
  }
}
