import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  cartItemList: string[] = [];

  constructor() {
    this.cartItemList = this.getCartItemList();
  }
  getCartItemList(): string[] {
    const list = localStorage.getItem("cartList");
    if (list) {
      this.cartItemList = JSON.parse(list);
    } else {
      localStorage.setItem("cartList", JSON.stringify([]));
    }
    return this.cartItemList;
  }

  hasAddedToCart(id: string): boolean {
    return (this.cartItemList.indexOf(id) > -1);
  }

  addToCart(id: string): void {
    this.cartItemList.push(id);
    localStorage.setItem("cartList", JSON.stringify(this.cartItemList));
  }

  removeFromCart(id: string): void {
    const index = this.cartItemList.indexOf(id);
    if (index > -1) {
      this.cartItemList.splice(index, 1);
    }
    localStorage.setItem("cartList", JSON.stringify(this.cartItemList));
  }
}
