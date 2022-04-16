import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Container } from '../models/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  baseUrl: string = "/api/Container";

  constructor(private httpClient: HttpClient) { }

  getContainer(): Observable<Container[]> {
    return this.httpClient.get<Container[]>(this.baseUrl + "/retrieveAllContainers").pipe
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
