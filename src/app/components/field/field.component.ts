import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Point } from '../../point';
import { SnakeService } from '../../services/snake.service';
import { FoodService } from '../../services/food.service';
import { FieldSizeService } from '../../services/field-size.service';
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
  private rows:any[] = Array(this.field.size);
  private cells:any[] = Array(this.field.size);
  private score:number = this.snake.length - 10;
  private speed:Object[] = [
    {val: 80, opt : 'Fast'},
    {val: 400, opt : 'Normal'},
    {val: 800, opt : 'Slow'},
  ]
  private fieldSize:Object[] = [
    {val: 50, opt : 'Big'},
    {val: 40, opt : 'Medium'},
    {val: 30, opt : 'Small'},
  ]
  constructor(
    private snake:SnakeService, 
    private food:FoodService, 
    private field:FieldSizeService
  ) { 
    snake.chnageScore.subscribe(()=>{ this.score = snake.length - 10 });
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

  private changeField(event):void {
    let size = +event.target.value;
    this.field.size = size;
    this.rows = Array(size);
    this.cells = Array(size);
    this.snake.startNewGame();
    this.food.newFood(this.snake.snake);
  }
}