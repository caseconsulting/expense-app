import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Click(typeName: string, typeBudget: string, odCheckbox: boolean) {
    console.log(typeName, typeBudget, odCheckbox);
  }
}
