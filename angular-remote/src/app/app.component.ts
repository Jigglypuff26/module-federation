import { Component } from '@angular/core';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="angular-app">
      <div class="card">
        <h2>🅰️ Angular Remote Application</h2>
        <p>This is an independent Angular micro-frontend</p>

        <div class="form-container">
          <h3>User Form Demo</h3>
          <form (ngSubmit)="addUser()">
            <div class="form-group">
              <input 
                [(ngModel)]="newUser.name" 
                name="name"
                placeholder="Name" 
                required
              />
            </div>
            <div class="form-group">
              <input 
                [(ngModel)]="newUser.email" 
                name="email"
                type="email"
                placeholder="Email" 
                required
              />
            </div>
            <button type="submit">Add User</button>
          </form>

          <div class="users-list">
            <h4>Users ({{ users.length }})</h4>
            <div 
              *ngFor="let user of users; let i = index" 
              class="user-card"
            >
              <div class="user-info">
                <strong>{{ user.name }}</strong>
                <span>{{ user.email }}</span>
              </div>
              <button (click)="removeUser(i)">×</button>
            </div>
          </div>
        </div>

        <div class="info">
          <h3>📦 Module Federation Info</h3>
          <ul>
            <li>Port: 3003</li>
            <li>Framework: Angular 17</li>
            <li>Exposed Module: ./App</li>
            <li>Shared: &#64;angular/core, &#64;angular/common, &#64;angular/forms, rxjs, zone.js</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .angular-app {
      padding: 20px;
    }

    .card {
      background: linear-gradient(135deg, #dd0031 0%, #c3002f 100%);
      padding: 30px;
      border-radius: 10px;
      color: white;
      box-shadow: 0 5px 15px rgba(221, 0, 49, 0.3);
    }

    .card h2 {
      margin-bottom: 10px;
      font-size: 28px;
    }

    .form-container {
      background: rgba(255, 255, 255, 0.2);
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }

    form {
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    button[type="submit"] {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 5px;
      background: white;
      color: #dd0031;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button[type="submit"]:hover {
      transform: scale(1.02);
    }

    .users-list {
      margin-top: 20px;
    }

    .users-list h4 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    .user-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: rgba(255, 255, 255, 0.3);
      margin-bottom: 8px;
      border-radius: 5px;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .user-info span {
      font-size: 14px;
      opacity: 0.9;
    }

    .user-card button {
      background: rgba(255, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .user-card button:hover {
      background: rgba(255, 0, 0, 0.9);
    }

    .info {
      background: rgba(255, 255, 255, 0.2);
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .info ul {
      list-style: none;
      margin-top: 10px;
      padding: 0;
    }

    .info li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .info li:last-child {
      border-bottom: none;
    }
  `],
})
export class AppComponent {
  users: User[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ];

  newUser: User = {
    name: '',
    email: '',
  };

  addUser(): void {
    if (this.newUser.name && this.newUser.email) {
      this.users.push({ ...this.newUser });
      this.newUser = { name: '', email: '' };
    }
  }

  removeUser(index: number): void {
    this.users.splice(index, 1);
  }
}
