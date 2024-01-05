import { Component, EventEmitter, Input, Output } from '@angular/core';
import { money } from '../../classes/money.mode';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css'
})
export class IncomesComponent {
  @Input() incomes:money[];
  @Input() outcomes:money[];
  @Output() updateIn = new EventEmitter<money[]>();
  @Output() updateOut = new EventEmitter<money[]>();
  
  deleteIncomes(id:number){
    this.incomes.splice(id,1)
    this.updateIn.emit(this.incomes)

  }
  deleteOutcomes(id:number){
    this.outcomes.splice(id,1)
    this.updateOut.emit(this.outcomes)
  }
}
