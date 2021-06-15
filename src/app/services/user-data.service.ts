import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  cartItemList: string[] = [];

  constructor() { }

  hasAddedToCart(id: string): boolean {
    return (this.cartItemList.indexOf(id) > -1);
  }

  addToCart(id: string): void {
    this.cartItemList.push(id);
  }

  removeFromCart(id: string): void {
    const index = this.cartItemList.indexOf(id);
    if (index > -1) {
      this.cartItemList.splice(index, 1);
    }
  }
}
