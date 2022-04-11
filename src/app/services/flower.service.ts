import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Flower } from '../models/flower';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class FlowerService {

    baseUrl: string = "/api/Flower";

    constructor(private httpClient: HttpClient) { }

    getFlowers(): Observable<Flower[]> {
        return this.httpClient.get<Flower[]>(this.baseUrl + "/retrieveAllFlowers").pipe
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

