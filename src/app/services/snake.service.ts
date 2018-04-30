import { Injectable } from '@angular/core';
import { Point } from '../point';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import { FoodService } from './food.service'

@Injectable()
export class SnakeService {
  private head:Point;
  private length:number = 10;
  private body:Point[]=[];
  private direction:string = 'top';

  constructor(private food:FoodService) { 
    this.head = new Point(25, 25);
    this.drawBody();    

    var subject = new ReplaySubject();    
    var subscription = subject.subscribe(
      () => {
        this.body.pop()
        this.body.unshift({x: this.head.x, y: this.head.y});
        switch(this.direction) {
          case 'left':
            this.head.x - 1 === -1 ? this.head.x = 50 : this.head.x--;
            this.gameOver();
            this.eatFood();
            break
          case 'right': 
            this.head.x + 1 === 50 ? this.head.x = 0 : this.head.x++;
            this.gameOver();
            this.eatFood(); 
            break
          case 'top': 
            this.head.y - 1 === -1 ? this.head.y = 50 : this.head.y--;
            this.gameOver();
            this.eatFood();
            break  
          case 'bottom': 
            this.head.y + 1 === 50 ? this.head.y = 0 : this.head.y++; 
            this.gameOver();
            this.eatFood();
            break  
          default: console.error('direction error');
        } 
      },
      e => console.error(e),
      () => console.info("completed")
    );

    setInterval(
      () => subject.next(1),
      200
    )

    // subject.complete();
    // subscription.unsubscribe();
  }

  drawBody(){
    for (let i=0; i < this.length; i++) {
      this.body[i] = new Point(this.head.x+i+1, this.head.y);      
    }    
  }

  changeDirection(keyCode){
    switch(keyCode) {
      case 37: this.direction = "left"; break
      case 38: this.direction = "top"; break
      case 39: this.direction = "right"; break  
      case 40: this.direction = "bottom"; break  
      default: console.error('ceangeDirection error');
    }
  }
  
  gameOver(){
    this.body.some(point => point.x === this.head.x && point.y === this.head.y) ? alert('Game Over') : null;
  }
  eatFood(){
    if (this.head.x === this.food._food.x && this.head.y === this.food._food.y) {
      this.body.push(null)
      this.food.newFood()
    }
  }
  get snake() {
    return [this.head, ...this.body]
  }
}
