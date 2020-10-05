import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [LoaderComponent],
  imports: [
  ],
  exports:[
    CommonModule,
    HttpClientModule,
    FormsModule,   
    LoaderComponent
  ]
})
export class SharedModule { }
