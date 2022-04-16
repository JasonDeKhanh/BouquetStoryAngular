import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AddOn } from '../models/add-on';

@Injectable({
  providedIn: 'root'
})
export class AddOnService {

  baseUrl: string = "/api/AddOn";

  constructor(private httpClient: HttpClient) { }

  getAddOns(): Observable<AddOn[]> {
    return this.httpClient.get<AddOn[]>(this.baseUrl + "/retrieveAllAddOns").pipe
        (
            catchError(this.handleError)
        );
}

getAddOnByAddOnId(addOnId: number): Observable<AddOn> {
    return this.httpClient.get<AddOn>(this.baseUrl + "/retrieveAddOn/" + addOnId).pipe(
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
