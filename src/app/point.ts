export class Point {
    public x:number;
    public y:number;
    
    constructor(size?:number, x?:number, y?:number){
        this.x = x >= 0 ? x : this.random(size);
        this.y = y >= 0 ? y : this.random(size);
    }

    private random(size):number {
        return Math.floor(Math.random() * size);
    }
}