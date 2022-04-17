import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { AddOnService } from '../../services/add-on.service';
import { AddOn } from '../../models/add-on';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-add-on',
  templateUrl: './view-add-on.component.html',
  styleUrls: ['./view-add-on.component.css'],
  providers: [MessageService]
})
export class ViewAddOnComponent implements OnInit {
  addOnId: string | null;
  addOnToView: AddOn | null;
  retrieveAddOnError: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public addOnService: AddOnService)
    {
      this.addOnId = null;
      this.addOnToView = new AddOn();
      this.retrieveAddOnError = false;
    }

  ngOnInit(): void {
    this.addOnId = this.activatedRoute.snapshot.paramMap.get('addOnId');

    if(this.addOnId != null) {
      this.addOnService.getAddOnByAddOnId(parseInt(this.addOnId)).subscribe({
        next:(response)=>{
          this.addOnToView = response;
        },
        error:(error)=>{
          this.retrieveAddOnError = true;
        }
      });
    }
  }

}
