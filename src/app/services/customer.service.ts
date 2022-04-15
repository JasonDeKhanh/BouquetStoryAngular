import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { Customer } from '../models/customer';
import { RegisteredGuest } from '../models/registered-guest';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  baseUrl: string = "/api/Customer";

  constructor(private httpClient: HttpClient) { }

  createNewCustomer(newCustomer: RegisteredGuest): Observable<number>
  {		
  
    return this.httpClient.put<number>(this.baseUrl, newCustomer, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  customerLogin(username: string | undefined, password: string | undefined): Observable<RegisteredGuest>
  {
    return this.httpClient.get<RegisteredGuest>(this.baseUrl + "/customerLogin?username=" + username + "&password=" + password).pipe
    (
      catchError(this.handleError)
    );
  }

  updateCustomer(newCustomer: RegisteredGuest): Observable<RegisteredGuest>
  {
    return this.httpClient.post<RegisteredGuest>(this.baseUrl + "/updateCustomer", newCustomer, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  updatePassword(newCustomer: RegisteredGuest): Observable<RegisteredGuest>
  {
    return this.httpClient.post<RegisteredGuest>(this.baseUrl + "/updatePassword", newCustomer, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse)
  {
    let errorMessage: string = "";
    
    if (error.error instanceof ErrorEvent) 
    {		
      errorMessage = "An unknown error has occurred: " + error.error;
    } 
    else 
    {		
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }
    
    console.error(errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }
}
