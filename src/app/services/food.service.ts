import { Injectable } from '@angular/core';
import { Point } from '../point';
import { FieldSizeService } from './field-size.service';

@Injectable()
export class FoodService {
  private food:Point = new Point(this.field.size);
  constructor(public field:FieldSizeService) { }  
  newFood(snake){
    this.food = new Point(this.field.size);
    if(snake.some(point => point && point.x === this.food.x && point.y === this.food.y)) 
      this.food = new Point(this.field.size);
  }

  public get _food():Point {
    return this.food;
  }
}
