import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { Customer } from '../models/customer';
import { RegisteredGuest } from '../models/registered-guest';
import { Address } from '../models/address';
import { AddressReq } from '../models/address-req';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  baseUrl: string = "/api/Address";

  constructor(private httpClient: HttpClient,
              public sessionService: SessionService,) { }

  createNewAddress(newAddress: Address){
    let addressReq : AddressReq = new AddressReq(newAddress, this.sessionService.getUsername());
    return this.httpClient.put<number>(this.baseUrl, addressReq, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  getAddresses(username: string | undefined): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.baseUrl + "/retrieveAllAddresses?username="+username).pipe
        (
            catchError(this.handleError)
        );
  }

  updateAddress(updatedAddree: Address): Observable<RegisteredGuest>
  {
    return this.httpClient.post<RegisteredGuest>(this.baseUrl , updatedAddree, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  deleteAddress(deleteAddree: Address): Observable<any>
  {
    console.log(this.baseUrl +"/"+deleteAddree.addressId);
    return this.httpClient.delete<any>(this.baseUrl +"/"+ deleteAddree.addressId).pipe
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
