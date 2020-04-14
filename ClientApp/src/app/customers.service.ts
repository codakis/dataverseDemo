import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from './models/customer';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/customers/';
  }

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.myAppUrl + this.myApiUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  getCustomer(custID: number): Observable<Customer> {
    return this.http
      .get<Customer>(this.myAppUrl + this.myApiUrl + custID)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveCustomer(customer): Observable<Customer> {
    return this.http
      .post<Customer>(
        this.myAppUrl + this.myApiUrl,
        JSON.stringify(customer),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  updateCustomer(custID: number, customer): Observable<Customer> {
    return this.http
      .put<Customer>(
        this.myAppUrl + this.myApiUrl + custID,
        JSON.stringify(customer),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  deleteCustomer(custID: number): Observable<Customer> {
    return this.http
      .delete<Customer>(this.myAppUrl + this.myApiUrl + custID)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = error.error.message;
    } else {
      //  server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
