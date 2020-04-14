import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/customers.service';
import { Customer } from 'src/app/models/customer';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customers$ = this.customersService.getCustomers();
  }

  delete(custID) {
    const ans = confirm(
      'Do you want to delete this customer with id: ' + custID
    );
    if (ans) {
      this.customersService.deleteCustomer(custID).subscribe((data) => {
        this.loadCustomers();
      });
    }
  }
}
