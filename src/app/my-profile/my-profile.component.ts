import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { RegisteredGuest } from '../models/registered-guest';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  currentCustomer: RegisteredGuest = new RegisteredGuest();

  displayUpdateDialog : boolean = false;
  registerSuccess: boolean;
  registerError: boolean;
  message: string | undefined;

  constructor(public sessionService: SessionService,
              private customerService: CustomerService) {
    this.currentCustomer = sessionService.getCurrentCustomer();
    this.registerError = false;
    this.registerSuccess = false;
    
  }

  ngOnInit(): void {

  }

  editProfile(){
    this.displayUpdateDialog = true;
  }

  updateCustomer(){ 
    let passwordValid : boolean = true;
    if(this.currentCustomer.password != undefined && this.currentCustomer.password != "") {
      if(this.currentCustomer.password.length < 8)
        passwordValid = false;
    }

    if(this.currentCustomer.password == undefined || this.currentCustomer.password == "") {
      this.currentCustomer.password = "";
    }

    if(this.currentCustomer.firstName!=null && this.currentCustomer.lastName!=null && 
        this.currentCustomer.email!=null && passwordValid) {
      this.customerService.updateCustomer(this.currentCustomer).subscribe({
        next:(response) => {
          this.registerSuccess = true;
          this.registerError = false;
          this.message = "You have successfully updated your account!";
          this.currentCustomer = response;

          this.sessionService.setCurrentCustomer(response);
        },
        error:(error) =>{
          this.registerError = true;
          this.registerSuccess = false;
        //   this.message = "An error has occurred while registering new account: \n" + error;
          this.message = "An unexpected error occured during update!";
          
          console.log('********** RegisterNewAccount.ts: ' + error);
        }
      })
    }

  }

}
