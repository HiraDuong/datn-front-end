import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id: number|null = null;
  constructor() {}

  setUserId(id: number): void {
    this.id = id;
  }

  getUserId(): number|null {
    return this.id;
  }

  clearUserId(): void {
    this.id = null;
  }
}
