import { Component, OnInit } from '@angular/core';
import * as size from  '../../varibles';
import { Point } from '../../point';
import { SnakeService } from '../../services/snake.service';
import { FoodService } from '../../services/food.service';
import * as _ from "lodash";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent implements OnInit {
  private rows:any[] = Array(size.rows);
  private cells:any[] = Array(size.rows);
  private point = new Point(10, 10);

  constructor(private snake:SnakeService, private food:FoodService) { 

  }

  ngOnInit() {}

  drawPoint(x,y){
    return _.some(this.snake.snake, {'x': x, 'y':y}) || (x === this.food._food.x && y === this.food._food.y)
  }

  changeDirection(e){
    this.snake.changeDirection(e.keyCode);
  }
}
