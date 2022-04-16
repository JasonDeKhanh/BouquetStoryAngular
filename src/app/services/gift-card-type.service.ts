import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GiftCardType } from '../models/gift-card-type';

@Injectable({
  providedIn: 'root'
})
export class GiftCardTypeService {

  baseUrl: string = "/api/GiftCardType";

  constructor(private httpClient: HttpClient) { }

  getGiftCardTypes(): Observable<GiftCardType[]> {
    return this.httpClient.get<GiftCardType[]>(this.baseUrl + "/retrieveAllGiftCardTypes").pipe
        (
            catchError(this.handleError)
        );
}

getGiftCardTypeByGiftCardTypeId(giftCardTypeId: number): Observable<GiftCardType> {
    return this.httpClient.get<GiftCardType>(this.baseUrl + "/retrieveGiftCardType/" + giftCardTypeId).pipe(
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
