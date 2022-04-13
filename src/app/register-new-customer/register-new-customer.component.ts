import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { RegisteredGuest } from '../models/registered-guest';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-register-new-customer',
  templateUrl: './register-new-customer.component.html',
  styleUrls: ['./register-new-customer.component.css']
})
export class RegisterNewCustomerComponent implements OnInit {
  newCustomer: RegisteredGuest;

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  constructor(private customerService: CustomerService) {
    this.newCustomer = new RegisteredGuest();
    
    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit(): void {
  }

  registerNewCustomer(){
    if(this.newCustomer != null) {
      // let customer: Customer = new RegisteredGuest();
      console.log('**********  ' +this.newCustomer.email );
      console.log('**********  ' +this.newCustomer.firstName );
      console.log('**********  ' +this.newCustomer.lastName );
      console.log('**********  ' +this.newCustomer.password );
      this.customerService.createNewCustomer(this.newCustomer).subscribe({
        next:(response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "You have successfully registered a new account!";
        },
        error:(error) =>{
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while registering new account: " + error;
          
          console.log('********** RegisterNewAccount.ts: ' + error);
        }
      })
    }
    
  }

}
