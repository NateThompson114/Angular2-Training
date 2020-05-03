import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  numbers = [1, 2, 3, 4, 5];
  oddNumbers = [];
  evenNumbers = [];
  onlyOdd = false;
  value = 10;

  constructor() {
    this.numbers.forEach(number => {
      if (number % 2 === 0) {
        this.evenNumbers.push(number);
      } else {
        this.oddNumbers.push(number);
      }
    });
  }

  ngOnInit(): void { }
}
