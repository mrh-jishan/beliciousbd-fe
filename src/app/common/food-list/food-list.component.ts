import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  foodList$ = Array(5);

  constructor() {
  }

  ngOnInit() {
  }

}
