import { Component, OnInit, ViewChild } from '@angular/core';
import {ElementRef} from '@angular/core';
import { Point } from '../../point';
import { SnakeService } from '../../services/snake.service';
import { FoodService } from '../../services/food.service';
import * as _ from "lodash";

// function _window() : any {  
//   // return the global native browser window object
//   return window;
// }
// _window().addEventListener("keyup", event => console.log(event.keyCode));

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent {
  
  private rows:any[] = Array(50);
  private cells:any[] = Array(50);
  private score:number = this.snake.length;
  private speed:Object[] = [
    {val: 2000, opt : 1},
    {val: 1500, opt : 2},
    {val: 1000, opt : 3},
    {val: 500, opt : 4},
    {val: 100, opt : 5},
  ]

  constructor(private snake:SnakeService, private food:FoodService) { 
    snake.chnageScore.subscribe(()=>{ this.score = snake.length });
  }

  private drawPoint(x:number ,y:number):boolean {
    return _.some(this.snake.snake, {'x': x, 'y':y}) || (x === this.food._food.x && y === this.food._food.y)
  }

  private changeSpeed(event):void {
    this.snake.changeSpeed(event.target.value);
  }

  private changeDirection(key){
    this.snake.changeDirection(key);
  }
}