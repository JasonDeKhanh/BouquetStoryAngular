import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Decoration } from '../models/decoration';

@Injectable({
  providedIn: 'root'
})
export class DecorationService {

  baseUrl: string = "/api/Decoration";

  constructor(private httpClient: HttpClient) { }

  getBundles(): Observable<Decoration[]> {
    return this.httpClient.get<Decoration[]>(this.baseUrl + "/retrieveAllDecorations").pipe
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
