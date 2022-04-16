import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { SaleTransaction } from '../models/sale-transaction';
import { SalesTransactionReq } from '../models/sales-transaction-req';
import { SaleTransactionLineItem } from '../models/sale-transaction-line-item';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SaleTransactionService {

  baseUrl: string = "/api/SaleTransaction";

  constructor(private httpClient: HttpClient,
    public sessionService: SessionService,) { }

    createNewSessionService(username: string, saleTransaction: SaleTransaction, saleTransactionLineItems:SaleTransactionLineItem[]){
      let salesTransactionReq = new SalesTransactionReq(username, saleTransaction, saleTransactionLineItems);
      return this.httpClient.put<number>(this.baseUrl, salesTransactionReq, httpOptions).pipe
      (
        catchError(this.handleError)
      );
    }

    getSessionServices(username: string | undefined): Observable<SaleTransaction[]> {
      return this.httpClient.get<SaleTransaction[]>(this.baseUrl + "/retrieveAllTransactions?username="+username).pipe
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
