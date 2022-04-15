import { Injectable } from '@angular/core';

import { Customer } from '../models/customer';
import { RegisteredGuest } from '../models/registered-guest';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean {
    if (sessionStorage['isLogin'] == "true") {
      return true;
    }
    else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage['isLogin'] = isLogin;
  }

  getCurrentCustomer(): RegisteredGuest {
    return JSON.parse(sessionStorage['currentCustomer']);
  }

  setCurrentCustomer(currentCustomer: RegisteredGuest | null): void {
    sessionStorage['currentCustomer'] = JSON.stringify(currentCustomer);
  }


  getUsername(): string {
    return sessionStorage['username'];
  }

  setUsername(username: string | undefined): void {
    sessionStorage['username'] = username;
  }


  getPassword(): string {
    return sessionStorage['password'];
  }

  setPassword(password: string | undefined): void {
    sessionStorage['password'] = password;
  }

  getCartLineItems(): SaleTransactionLineItem[] {
    return sessionStorage['cartLineItems'];
  }

  setCartLineItems(cartLineItems: SaleTransactionLineItem[]): void {
    sessionStorage['cartLineItems'] = JSON.stringify(cartLineItems);
  }
}
