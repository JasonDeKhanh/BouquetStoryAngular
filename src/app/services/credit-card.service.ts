import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { Customer } from '../models/customer';
import { RegisteredGuest } from '../models/registered-guest';
import { CreditCard } from '../models/credit-card';
import { CreditCardReq } from '../models/credit-card-req';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  baseUrl: string = "/api/CreditCard";

  constructor(private httpClient: HttpClient,
    public sessionService: SessionService,) { }

  createNewCreditCard(newCreditCard: CreditCard){
    let creditCardRed : CreditCardReq = new CreditCardReq(newCreditCard, this.sessionService.getUsername());
    return this.httpClient.put<number>(this.baseUrl, creditCardRed, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  getcreditCards(username: string | undefined): Observable<CreditCard[]> {
    return this.httpClient.get<CreditCard[]>(this.baseUrl + "/retrieveAllCreditCards?username="+username).pipe
        (
            catchError(this.handleError)
        );
  }


  deleteCreditCard(deleteCreditCard: CreditCard)
  {
    // console.log(this.baseUrl +"/"+deleteCreditCard.creditCardId);
    return this.httpClient.delete<any>(this.baseUrl +"/deleteCard?creditCardId="
            + deleteCreditCard.creditCardId + "&username=" + this.sessionService.getUsername()).subscribe(data => {
      console.log(data);
    });
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
