import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { PremadeBouquetService } from '../../services/premade-bouquet.service';
import { PremadeBouquet } from '../../models/premade-bouquet';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-premade-bouquet',
  templateUrl: './view-premade-bouquet.component.html',
  styleUrls: ['./view-premade-bouquet.component.css']
})
export class ViewPremadeBouquetComponent implements OnInit {
  premadeBouquetId: string | null;
  premadeBouquetToView: PremadeBouquet | null;
  retrievePremadeBouquetError: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public premadeBouquetService: PremadeBouquetService)
    {
      this.premadeBouquetId = null;
      this.premadeBouquetToView = new PremadeBouquet();
      this.retrievePremadeBouquetError = false;
    }

  ngOnInit(): void {
    this.premadeBouquetId = this.activatedRoute.snapshot.paramMap.get('premadeBouquetId');

    if(this.premadeBouquetId != null) {
      this.premadeBouquetService.getPremadeBouquetByPremadeBouquetId(parseInt(this.premadeBouquetId)).subscribe({
        next:(response)=>{
          this.premadeBouquetToView = response;
        },
        error:(error)=>{
          this.retrievePremadeBouquetError = true;
        }
      });
    }
  }

}
