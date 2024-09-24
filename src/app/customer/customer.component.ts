import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildService } from '../services/child.service';
import { CustomerService } from '../services/customer.service';
import { ICustomers } from '../interfaces/customer';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CustomerCreateComponent } from '../customer.create/customer.create.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit{
  constructor(
    private router: Router, 
    private childService: ChildService,
    private customerService: CustomerService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.onGetCustomers();


    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.applyFilter(value);
      });
    }

  searchControl = new FormControl(); 
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource!: ICustomers;
  myName!: string;

  goTo() {
    const dialogRef = this.dialog.open(CustomerCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.createCustomers(result).subscribe(newCustomer => {
          this.dataSource = [...this.dataSource, newCustomer];
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase(); 
    let filteredData =this.dataSource.filter(user =>
        user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    // this.dataSource = filteredData;
    this.dataSource = [...filteredData];
  }

  onGetCustomers(){
    this.customerService.getCustomers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  viewCustomer(element: any) {
    this.dialog.open(CustomerDetailComponent, {
      width: '400px',
      data: element 
    });
  }

  editCustomer(element: any) {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.customerService.updateCustomer(result).subscribe(updatedCustomer => {
          const index = this.dataSource.findIndex(element => element.id === updatedCustomer.id);
          if (index !== -1) {
            this.dataSource[index] = updatedCustomer;
            this.dataSource = [...this.dataSource];
          }
        });
      }
    });
  }


  deleteCustomer(element: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message: `Are you sure you want to delete customer ${element.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the delete API from the service
        this.customerService.deleteCustomers(element.id).subscribe(() => {
          // Remove the deleted customer from the dataSource
          this.dataSource = this.dataSource.filter(item => item.id !== element.id);
        });
      }
    });
  }
}
