import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { GiftCardTypeService } from '../../services/gift-card-type.service';
import { GiftCardType } from '../../models/gift-card-type';
import { GiftCard } from '../../models/gift-card';

import { SaleTransactionLineItem } from '../../models/sale-transaction-line-item';
import { MessageService } from 'primeng/api';

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

}
