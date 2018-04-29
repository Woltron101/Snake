import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SnakeService } from './services/snake.service'
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
  providers: [SnakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
