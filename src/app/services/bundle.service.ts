import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Bundle } from '../models/bundle';

@Injectable({
    providedIn: 'root'
})
export class BundleService {

    baseUrl: string = "/api/Bundle";

    constructor(private httpClient: HttpClient) { }

    getBundles(): Observable<Bundle[]> {
        return this.httpClient.get<Bundle[]>(this.baseUrl + "/retrieveAllBundles").pipe
            (
                catchError(this.handleError)
            );
    }

    getBundleByBundleId(bundleId: number): Observable<Bundle> {
        return this.httpClient.get<Bundle>(this.baseUrl + "/retrieveBundle/" + bundleId).pipe(
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
