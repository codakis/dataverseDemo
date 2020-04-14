import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customer$: Observable<Customer>;
  custID: number;
  constructor(
    private customerService: CustomersService,
    private avRoute: ActivatedRoute
  ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.custID = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer() {
    this.customer$ = this.customerService.getCustomer(this.custID);
  }
}
