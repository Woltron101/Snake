export class Point {
    public x:number;
    public y:number;
    
    constructor(x?:number, y?:number){
        this.x = x >= 0 ? x : this.random();
        this.y = y >= 0 ? y : this.random();
    }

    private random():number {
        return Math.floor(Math.random() * this._size);
    }
}