import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { GiftCardTypeService } from '../../services/gift-card-type.service';
import { GiftCardType } from '../../models/gift-card-type';
import { GiftCard } from '../../models/gift-card';

import { SaleTransactionLineItem } from '../../models/sale-transaction-line-item';
import { MessageService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-view-gift-card-type',
  templateUrl: './view-gift-card-type.component.html',
  styleUrls: ['./view-gift-card-type.component.css'],
  providers: [MessageService]
})
export class ViewGiftCardTypeComponent implements OnInit {
  giftCardTypeId: string | null;
  giftCardTypeToView: GiftCardType | null;
  retrieveGiftCardTypeError: boolean;
  displayCreateGiftCardDialog : boolean;
  createGiftCardError : boolean;
  newGiftCard: GiftCard;
  message: string | undefined;
  createGiftCardSuccess: boolean;
  uploadedFiles: any[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public giftCardTypeService: GiftCardTypeService,
              private sessionService: SessionService,
              private messageService: MessageService)
  {
    this.giftCardTypeId = null;
    this.giftCardTypeToView = new GiftCardType();
    this.retrieveGiftCardTypeError = false;
  }

  ngOnInit(): void {
    this.giftCardTypeId = this.activatedRoute.snapshot.paramMap.get('giftCardTypeId');

    if(this.giftCardTypeId != null) {
      this.giftCardTypeService.getGiftCardTypeByGiftCardTypeId(parseInt(this.giftCardTypeId)).subscribe({
        next:(response)=>{
          this.giftCardTypeToView = response;
        },
        error:(error)=>{
          this.retrieveGiftCardTypeError = true;
        }
      });
    }
  }

  createNewGiftCard() {
    if (this.newGiftCard.message != null) {
      this.newGiftCard.giftCardType = this.giftCardTypeToView;
      this.addProductToCart(this.newGiftCard);
    }
    else {
      this.createGiftCardError = true;
      this.message = "Creation failed: No message written!";
    }
  }

  // ADD TO CART
  addProductToCart(giftCard: GiftCard) {
    let cartLineItems: SaleTransactionLineItem[];
    cartLineItems = this.sessionService.getCartLineItems();
    var newLineItem: SaleTransactionLineItem;
    newLineItem = new SaleTransactionLineItem();

    // add to cart
    console.log("cartLineItems.length?? " + cartLineItems.length)
    // newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, 100);
    newLineItem = new SaleTransactionLineItem(cartLineItems.length + 1, 1, giftCard.giftCardType?.unitPrice);
    newLineItem.item = giftCard;
    cartLineItems.push(newLineItem);
    this.sessionService.setCartLineItems(cartLineItems);
    console.log("inside here, item not already inside cart")
    console.log("line item price: " + newLineItem.unitPrice)
    console.log("line item serial number??: " + newLineItem.serialNumber)
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Added item to cart!', life: 3000});

    this.message = "You have successfully created a gift card and added it to your cart!";
    this.createGiftCardSuccess = true;
  }

  onUpload(event: any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  showCreateGiftCardDialog() {
    this.displayCreateGiftCardDialog = true;
    this.createGiftCardError = false;
    this.newGiftCard = new GiftCard();
    this.createGiftCardSuccess = false;
    this.uploadedFiles = [];
  }

}
