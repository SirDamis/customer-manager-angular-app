import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer, ICustomers } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ICustomers> {
    return this.httpClient.get<ICustomers>("https://jsonplaceholder.typicode.com/users");
  }

  createCustomers(data: ICustomer): Observable<ICustomer> {
    return this.httpClient.post<ICustomer>("https://jsonplaceholder.typicode.com/users/", data);
  }

  updateCustomer(data: ICustomer): Observable<ICustomer> {
    return this.httpClient.put<ICustomer>(`https://jsonplaceholder.typicode.com/users/${data.id}`, data);
  }

  deleteCustomers(id: string): Observable<ICustomer> {
    return this.httpClient.delete<ICustomer>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
