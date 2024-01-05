import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddIncomeComponent } from './add-income/add-income.component';
import { IncomesComponent } from './incomes/incomes.component';
import { money } from '../classes/money.mode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AddIncomeComponent,
    IncomesComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'IncomeApp';
  incomes: money[] = [
    new money('Payment', 870000, '+'),
    new money('Extra hours', 970000, '+'),
  ];
  outcomes: money[] = [new money('Rent', 100000, '-')];
  budget: number = 0;
  entrancy: number = 0;
  departure: number = 0;
  percentage: any = (this.departure / this.entrancy) * 100;

  updateIn(newValue: money[]) {
    this.incomes = newValue;
    this.calculateIncome();
    this.calculateData();
    this.calculatePercentage();
  }

  updateOut(newValue: money[]) {
    this.outcomes = newValue;
    this.calculateIncome();
    this.calculateData();
    this.calculatePercentage();
  }

  someMoney(moneyEntering: money) {
    switch (moneyEntering.operator) {
      case '+':
        this.incomes.push(moneyEntering);
        this.addIncome(moneyEntering);
        this.entrancy += moneyEntering.value;
        this.calculatePercentage();
        break;
      case '-':
        this.outcomes.push(moneyEntering);
        this.substractIncomes(moneyEntering);
        this.departure += moneyEntering.value;
        this.calculatePercentage();
        break;
      default:
        break;
    }
  }

  //This changes the bugdet in general
  calculateIncome() {
    const allTrans = this.incomes.concat(this.outcomes);
    this.budget = 0;
    allTrans.forEach((e) => {
      switch (e.operator) {
        case '+':
          this.budget += e.value;
          break;
        case '-':
          this.budget -= e.value;
          break;
        default:
          break;
      }
    });
  }
//Add income to the budget
  addIncome(newMoney: money) {
    this.budget += newMoney.value;
  }
  //Sustract income to the budget
  substractIncomes(lessMoney: money) {
    this.budget -= lessMoney.value;
  }

  calculatePercentage = () => {
    if(this.departure === 0 ){
      this.percentage = 0
      return
    }
    if (this.entrancy ===0) {
      this.percentage = 100
      return
    }
    this.percentage = ((this.departure / this.entrancy) * 100).toFixed(1);
  };
  calculateData = () => {
    this.entrancy  =0
    this.incomes.forEach((i) => {
      this.entrancy += i.value;
    });

    this.departure = 0
    this.outcomes.forEach((i) => {
      
      this.departure += i.value;
    });
  };
  ngOnInit(): void {
    this.calculateIncome();
    this.calculateData();
    this.calculatePercentage();
  }
}
