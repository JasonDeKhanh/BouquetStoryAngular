import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';



import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MyAddressesComponent implements OnInit {

  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  addressDialog: boolean; //selectedAddresses
  addresses : Address[] | undefined;
  address: Address = new Address();
  submitted: boolean = false;
  updateAddressDialog: boolean = false;


  constructor(private router: Router,
              public sessionService: SessionService,
              private addressService: AddressService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService) {

    
    this.profileMenuItems = new Array();
    this.myOrderMenuItems = new Array();
    // this.addresses = ad;
    this.addressDialog = false;

    this.addressService.getAddresses(this.sessionService.getUsername()).subscribe({
      next:(response)=>{
        this.addresses = response;
      },
      error:(error)=>{
        console.log('********** ViewAllAddress.ts: ' + error);
      }
    });
  }

  ngOnInit(): void {

    this.checkAccessRight();

    this.profileMenuItems = [
      {
        label: 'My Profile',
        routerLink: ["/myProfile"]
      },
      {
        label: 'My Addresses',
        routerLink: ["/myAddresses"]
      },
      {
        label: 'My Credit Cards',
        routerLink: ["/myCreditCards"]
      }
    ];

    this.myOrderMenuItems = [
      {
        label: 'My Orders',
        routerLink: ["/myOrders"]
      }
    ];


  }

  openNew() {
    this.address = new Address();
    this.submitted = false;
    this.addressDialog = true;
  }

  deleteAddress(address: Address) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the address?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.addresses = this.addresses.filter(()=>(val => val.addressId !== address.addressId)).subscribe(x => console.log(x));
            console.log(address)
            this.addressService.deleteAddress(address);
            
            // this.address = new Address();
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Address Deleted', life: 3000});
            
            this.addressService.getAddresses(this.sessionService.getUsername()).subscribe({
              next:(response)=>{
                this.addresses = response;
              },
              error:(error)=>{
                console.log('********** ViewAllAddress.ts: ' + error);
              }
            });
        }
    });
  }

editAddress(address: Address){
  this.address = {...address};
  this.updateAddressDialog = true;
}

hideDialog() {
  this.addressDialog = false;
  this.updateAddressDialog = false;
  this.submitted = false;
}

updateAddress(){
  this.submitted = true;

  if(this.address.line!="" && this.address.postCode!="") {
    this.addressService.updateAddress(this.address).subscribe({
      next: (response) => {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Address Added', life: 3000});
          this.address = new Address();
          this.submitted = false;

          this.addressService.getAddresses(this.sessionService.getUsername()).subscribe({
            next:(response)=>{
              this.addresses = response;
            },
            error:(error)=>{
              console.log('********** ViewAllAddress.ts: ' + error);
            }
          });

          this.updateAddressDialog = false;
      },
      error: (error) => {
          //   this.message = "An error has occurred while registering new account: \n" + error;
          // this.message = "This email is already registered as a customer!";

          console.log('********** RegisterNewAccount.ts: ' + error);
      }
  })
  }
}

addAddress(){
  this.submitted = true;

  if(this.address.line!="" && this.address.postCode!="") {
    this.addressService.createNewAddress(this.address).subscribe({
      next: (response) => {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Address Added', life: 3000});
          this.address = new Address();
          this.submitted = false;

          this.addressService.getAddresses(this.sessionService.getUsername()).subscribe({
            next:(response)=>{
              this.addresses = response;
            },
            error:(error)=>{
              console.log('********** ViewAllAddress.ts: ' + error);
            }
          });

          this.addressDialog = false;
      },
      error: (error) => {
          //   this.message = "An error has occurred while registering new account: \n" + error;
          // this.message = "This email is already registered as a customer!";

          console.log('********** RegisterNewAccount.ts: ' + error);
      }
  })
  }

}
  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}

}
