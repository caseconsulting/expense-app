import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'new-expense-type',
  templateUrl: './new-expense-type.component.html',
  styleUrls: ['./new-expense-type.component.css']
})
export class NewExpenseTypeComponent implements OnInit {
  title = 'New Expense Type';
  constructor() { }

  ngOnInit() {
  }

  Click(typeName:string, typeBudget:string, odCheckbox:boolean) {
    console.log(typeName, typeBudget, odCheckbox);
  }
}
