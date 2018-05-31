import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { SuperAdminService } from '../services/super-admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sucategory',
  templateUrl: './sucategory.component.html',
  styleUrls: ['./sucategory.component.css']
})
export class SucategoryComponent implements OnInit {

  categoryData: any;
  env: any = environment.apiURL;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.superadminservice.getAllCategories().subscribe(
      res => {
        this.categoryData = '';
        this.categoryData = res['records'];
        this.dtTrigger.next();

      }
    );
  }

  setApproved(CategoryID: string, Value: boolean) {
    this.superadminservice.setCategoryApproved(CategoryID, Value).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.ngOnInit();
        } else {
          console.log('cannot approve or disapprove category.');
        }
      }
    );
  }

}
