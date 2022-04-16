import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PremadeBouquet } from '../models/premade-bouquet';

@Injectable({
  providedIn: 'root'
})
export class PremadeBouquetService {

	baseUrl: string = "/api/Bouquet";

	constructor(private httpClient: HttpClient) { }

	getPremadeBouquets(): Observable<PremadeBouquet[]> {
		return this.httpClient.get<PremadeBouquet[]>(this.baseUrl + "/retrieveAllPremadeBouquets").pipe
		(
			catchError(this.handleError)
		);
	}

	getPremadeBouquetByPremadeBouquetId(premadeBouquetId: number): Observable<PremadeBouquet> {
        return this.httpClient.get<PremadeBouquet>(this.baseUrl + "/retrievePremadeBouquet/" + premadeBouquetId).pipe(
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
