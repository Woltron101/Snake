import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SnakeService } from './services/snake.service'
import { FoodService } from './services/food.service'
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';


@NgModule({
  declarations: [
    AppComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SnakeService, FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
