import { Injectable, EventEmitter } from '@angular/core';
import { Point } from '../point';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import { FoodService } from './food.service';
import { FieldSizeService } from './field-size.service';
    
@Injectable()
export class SnakeService {
  private head:Point;
  public length:number = 10;
  private body:Point[]=[];
  private direction:string = this.randomPosition();
  public speed:number = 80;
  public interval;
  private subject;
  private subscription;
  public chnageScore: EventEmitter<boolean> = new EventEmitter();

  constructor(private food:FoodService, private field:FieldSizeService) {
    this.startNewGame();
  }

  private randomPosition():string {
    let numb = Math.floor(Math.random() * 4);
    let arr = ['left', 'right', 'top', 'bottom'];
    return arr[numb];
  }

  public startNewGame():void {
    this.head = new Point(this.field.size);
    this.body = [];
    this.drawBody();    

    this.subject = new ReplaySubject();    
    this.subscription = this.subject.subscribe(
      () => this.nextStep(),
      e => console.error(e),
      () => console.info("completed")
    );

    this.start();
  }

  private drawBody():void {
    for (let i=0; i < this.length; i++) {
      switch(this.direction) {
        case "left": this.body[i] = new Point(this.field.size, this.head.x+i+1, this.head.y); break;
        case "top": this.body[i] = new Point(this.field.size, this.head.x, this.head.y+i+1);break;
        case "right": this.body[i] = new Point(this.field.size, this.head.x-i-1, this.head.y);break; 
        case "bottom": this.body[i] = new Point(this.field.size, this.head.x, this.head.y-i-1);break; 
        default: console.error('drawSnake error');
      } 
    }    
  }

  public changeDirection(keyCode:number):void {
    if(36 < keyCode && 41 > keyCode){
    switch(keyCode) {
        case 37: this.direction = "left"; break;
        case 38: this.direction = "top"; break;
        case 39: this.direction = "right"; break; 
        case 40: this.direction = "bottom"; break; 
        default: console.error('changeDirection error');
      }
    }
  }

  private nextStep():void {
    this.body.pop();
    this.body.unshift(new Point(this.field.size, this.head.x, this.head.y));
    switch(this.direction) {
      case 'left':
        this.head.x - 1 === -1 ? this.head.x = this.field.size - 1: this.head.x--;
        this.checkNextStep();
        break
      case 'right': 
        this.head.x + 1 === this.field.size ? this.head.x = 0 : this.head.x++;
        this.checkNextStep(); 
        break
      case 'top': 
        this.head.y - 1 === -1 ? this.head.y = this.field.size - 1 : this.head.y--;
        this.checkNextStep();
        break  
      case 'bottom': 
        this.head.y + 1 === this.field.size ? this.head.y = 0 : this.head.y++;
        this.checkNextStep();            
        break  
      default: console.error('direction error');
    } 
  }

  private checkNextStep():void {
    this.gameOver();
    this.eatFood();
  }

  private gameOver():void {
    let moveOnBody:boolean = this.body.some(point => point.x === this.head.x && point.y === this.head.y);
    if(moveOnBody){
      if(confirm('Game Over! Star tNew Game?')){
        this.pause();
        this.startNewGame();
      } else this.pause();
    }
  }

  private eatFood():void {
    if (this.head.x === this.food._food.x && this.head.y === this.food._food.y) {
      this.length++;
      this.chnageScore.emit();
      this.body.push(null);
      this.food.newFood(this.snake);
    }
  }

  public changeSpeed(speed):void {
    this.pause();
    this.speed = speed;
    this.start();
  }
  public pause() {
    this.interval = clearInterval(this.interval);
  }
  public start():void {
    if(!this.interval){
      this.interval = setInterval(() => this.subject.next(1), this.speed);
    }    
  }
  public get snake():Point[] {
    return [this.head, ...this.body];
  }
  public get _interval() {
    return this.interval;
  }
}
