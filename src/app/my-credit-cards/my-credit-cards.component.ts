import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { CreditCard } from '../models/credit-card';
import { CreditCardService } from '../services/credit-card.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';



import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-credit-cards',
  templateUrl: './my-credit-cards.component.html',
  styleUrls: ['./my-credit-cards.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MyCreditCardsComponent implements OnInit {
  profileMenuItems: MenuItem[];
  myOrderMenuItems: MenuItem[];

  creditCardDialog: boolean =false; //selectedcreditCards
  creditCards : CreditCard[] | undefined;
  creditCard: CreditCard = new CreditCard();
  submitted: boolean = false;
  updateCreditCardDialog: boolean = false;

  constructor(private router: Router,
    public sessionService: SessionService,
    private creditCardService: CreditCardService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) { 

      this.profileMenuItems = new Array();
      this.myOrderMenuItems = new Array();
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
    this.creditCard = new CreditCard();
    this.submitted = false;
    this.creditCardDialog = true;
  }

  deleteCreditCard(creditCard: CreditCard) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the creditCard?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.creditCards = this.creditCards.filter(()=>(val => val.creditCardId !== creditCard.creditCardId)).subscribe(x => console.log(x));
            console.log(creditCard)
            this.creditCardService.deleteCreditCard(creditCard);
            
            // this.creditCard = new CreditCard();
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'CreditCard Deleted', life: 3000});
            
            this.creditCardService.getcreditCards(this.sessionService.getUsername()).subscribe({
              next:(response)=>{
                this.creditCards = response;
              },
              error:(error)=>{
                console.log('********** ViewAllCreditCard.ts: ' + error);
              }
            });
        }
    });
  }

editCreditCard(creditCard: CreditCard){
  this.creditCard = {...creditCard};
  this.updateCreditCardDialog = true;
}

hideDialog() {
  this.creditCardDialog = false;
  this.submitted = false;
}


addCreditCard(){
  this.submitted = true;

  if(this.creditCard.ccNum!="" && this.creditCard.ccHolderName!=""
    && this.creditCard.ccExpiryYear!=""&& this.creditCard.ccExpiryMonth!="") {
    this.creditCardService.createNewCreditCard(this.creditCard).subscribe({
      next: (response) => {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'CreditCard Added', life: 3000});
          this.creditCard = new CreditCard();
          this.submitted = false;

          this.creditCardService.getcreditCards(this.sessionService.getUsername()).subscribe({
            next:(response)=>{
              this.creditCards = response;
            },
            error:(error)=>{
              console.log('********** ViewAllCreditCard.ts: ' + error);
            }
          });

          this.creditCardDialog = false;
      },
      error: (error) => {
          //   this.message = "An error has occurred while registering new account: \n" + error;
          // this.message = "This email is already registered as a customer!";
          this.messageService.add({severity:'error', summary: 'Error', detail: error, life: 3000});
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


