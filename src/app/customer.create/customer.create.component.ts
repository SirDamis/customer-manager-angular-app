import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer.create',
  templateUrl: './customer.create.component.html',
  styleUrl: './customer.create.component.css'
})
export class CustomerCreateComponent {
  customerFormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CustomerCreateComponent>
    ){
      this.customerFormGroup = this.formBuilder.group({
        name: ["", [Validators.required,]],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
        address: ["", [Validators.required]],
        gender: ["", [Validators.required]],
      });
    }

  onSave(): void {
    if (this.customerFormGroup.valid) {
      this.dialogRef.close(this.customerFormGroup.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
