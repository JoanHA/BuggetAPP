import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { money } from '../../classes/money.mode';

interface errorForm {
  description: boolean;
  value: boolean;
}
@Component({
  selector: 'app-add-income',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.css',
})
export class AddIncomeComponent {
  IncomeForm!: FormGroup;
  errors!: errorForm;
  @Output() moneyAdded = new EventEmitter<money>();

  constructor(private fb: FormBuilder) {
    this.IncomeForm = this.fb.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      operator: ['+', Validators.required],
    });
  }
  sendData() {
    if (this.IncomeForm.status === 'INVALID') {
      this.errors = {
        description: this.IncomeForm.get('description')!.hasError('required'),
        value: this.IncomeForm.get('value')!.hasError('required'),
      };
      return;
    }
    switch (this.IncomeForm.value.operator) {
      case '+':
        const valor = new money(
          this.IncomeForm.value.description,
          this.IncomeForm.value.value,
          this.IncomeForm.value.operator
        );
       this.moneyAdded.emit(valor)
        break;
      case '-':
        const valor2 = new money(
          this.IncomeForm.value.description,
          this.IncomeForm.value.value,
          this.IncomeForm.value.operator
        );
        this.moneyAdded.emit(valor2)
        break;
      default:
        break;
    }
  }
}
