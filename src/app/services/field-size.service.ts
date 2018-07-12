import { Injectable } from '@angular/core';

@Injectable()
export class FieldSizeService {
  public _size:number;
  public set size(size){
    this._size = size;
  }
  public get size():number{
    return this._size || 50;
  }
}
