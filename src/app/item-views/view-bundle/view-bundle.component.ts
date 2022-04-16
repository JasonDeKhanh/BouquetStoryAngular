import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { BundleService } from '../../services/bundle.service';
import { Bundle } from '../../models/bundle';

@Component({
  selector: 'app-view-bundle',
  templateUrl: './view-bundle.component.html',
  styleUrls: ['./view-bundle.component.css']
})
export class ViewBundleComponent implements OnInit {
  bundleId: string | null;
  bundleToView: Bundle | null;
  retrieveBundleError: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public bundleService: BundleService)
    {
      this.bundleId = null;
      this.bundleToView = new Bundle();
      this.retrieveBundleError = false;
    }

  ngOnInit(): void {
    this.bundleId = this.activatedRoute.snapshot.paramMap.get('bundleId');

    if(this.bundleId != null) {
      this.bundleService.getBundleByBundleId(parseInt(this.bundleId)).subscribe({
        next:(response)=>{
          this.bundleToView = response;
        },
        error:(error)=>{
          this.retrieveBundleError = true;
        }
      });
    }
  }

}
