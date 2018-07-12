import { Injectable } from '@angular/core';
import { Point } from '../point';

@Injectable()
export class FoodService {
  private food:Point = new Point();
  constructor() { }  
  newFood(snake){
    this.food = new Point();
    if(snake.some(point => point && point.x === this.food.x && point.y === this.food.y)) 
      this.food = new Point();
  }

  public get _food():Point {
    return this.food;
  }
}
