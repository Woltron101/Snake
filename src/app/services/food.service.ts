import { Injectable } from '@angular/core';
import { Point } from '../point';

@Injectable()
export class FoodService {
  private size:number = 50;
  private food:Point = new Point(this.getRandomn(), this.getRandomn())
  constructor() { 

  }

  getRandomn() {
    return Math.floor(Math.random() * (this.size - 0));
  }

  newFood(){
    this.food = new Point(this.getRandomn(), this.getRandomn())
  }

  get _food(){
    return this.food;
  }
}
