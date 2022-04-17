import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CustomBouquet } from '../models/custom-bouquet';
import { CustomBouquetReq } from '../models/custom-bouquet-req';
import { Container } from '../models/container';
import { Flower } from '../models/flower';
import { Decoration } from '../models/decoration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomBouquetService {

  baseUrl: string = "/api/CustomBouquet";

  constructor(private httpClient: HttpClient,) { }

  createNewCustomBouquet(newCustomBouquet: CustomBouquet,
    newContainer: Container,
    newAddedFlowers: Flower[],
    newFlowerQuantitiesArray: number[],
    newAddedDecorations: Decoration[],
    newDecorationQuantitiesArray: number[],
  ) {

    let customBouquetReq: CustomBouquetReq = new CustomBouquetReq(newCustomBouquet, newContainer,
      newAddedFlowers, newFlowerQuantitiesArray, newAddedDecorations, newDecorationQuantitiesArray);
    return this.httpClient.put<number>(this.baseUrl, customBouquetReq, httpOptions).pipe
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
