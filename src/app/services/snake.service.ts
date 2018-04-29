import { Injectable } from '@angular/core';
import { Point } from '../point';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class SnakeService {
  private head:Point;
  private length:number = 10;
  private body:Point[]=[];
  private direction:string = 'top';

  constructor() { 
    this.head = new Point(25, 25);
    this.drawBody();
    

    var subject = new ReplaySubject();
    
    var subscription = subject.subscribe(

      () => {
        this.body.pop()
        this.body.unshift({x: this.head.x, y: this.head.y});
        switch(this.direction) {
          case 'left': this.head.x--; break
          case 'right': this.head.x++; break
          case 'top': this.head.y--; break  
          case 'bottom': this.head.y++; break  
          default: console.error('direction error');
        } 
      },
      e => console.error(e),
      () => console.info("completed")
    );
    setInterval(
      () => subject.next(1),
      1000
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
  
  get snake() {
    return [this.head, ...this.body]
  }
}
