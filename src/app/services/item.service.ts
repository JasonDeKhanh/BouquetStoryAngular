import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from '../models/item'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl: string = "/api/Item";

  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.baseUrl + "/retrieveAllAdminCreatedItems").pipe
      (
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
        errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
        errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
}
}
