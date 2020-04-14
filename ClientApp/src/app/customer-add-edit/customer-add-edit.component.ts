import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';
@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss'],
})
export class CustomerAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formFName: string;
  formLName: string;
  formAddress: string;
  formPhone: string;
  formEmail: string;
  custId: number;
  errorMessage: any;
  existingCustomer: Customer;

  constructor(
    private customersService: CustomersService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formFName = 'firstName';
    this.formLName = 'lastName';
    this.formAddress = 'address';
    this.formPhone = 'phone';
    this.formEmail = 'email';
    if (this.avRoute.snapshot.params[idParam]) {
      this.custId = this.avRoute.snapshot.params[idParam];
    }
    this.form = this.formBuilder.group({
      custId: 0,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    if (this.custId > 0) {
      this.actionType = 'Edit';
      this.customersService
        .getCustomer(this.custId)
        .subscribe(
          (data) => (
            (this.existingCustomer = data),
            this.form.controls[this.formFName].setValue(data.firstName),
            this.form.controls[this.formLName].setValue(data.lastName),
            this.form.controls[this.formAddress].setValue(data.address),
            this.form.controls[this.formPhone].setValue(data.phone),
            this.form.controls[this.formEmail].setValue(data.email)
          )
        );
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    if (this.actionType === 'Add') {
      let customer: Customer = {
        firstName: this.form.get(this.formFName).value,
        lastName: this.form.get(this.formLName).value,
        address: this.form.get(this.formAddress).value,
        phone: this.form.get(this.formPhone).value,
        email: this.form.get(this.formEmail).value,
      };

      this.customersService.saveCustomer(customer).subscribe((data) => {
        this.router.navigate(['/customer/', data.custID]);
      });
    }

    if (this.actionType === 'Edit') {
      let customer: Customer = {
        custID: this.existingCustomer.custID,
        firstName: this.form.get(this.formFName).value,
        lastName: this.form.get(this.formLName).value,
        address: this.form.get(this.formAddress).value,
        phone: this.form.get(this.formPhone).value,
        email: this.form.get(this.formEmail).value,
      };
      this.customersService
        .updateCustomer(customer.custID, customer)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }
  cancel() {
    this.router.navigate(['/']);
  }
  get firstName() {
    return this.form.get(this.formFName);
  }
  get lastName() {
    return this.form.get(this.formLName);
  }
  get address() {
    return this.form.get(this.formAddress);
  }
  get phone() {
    return this.form.get(this.formPhone);
  }
  get email() {
    return this.form.get(this.formEmail);
  }
}
