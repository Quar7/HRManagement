import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelModule } from '../hotel-module/hotel.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' } // 404 in future
    ]),
    HotelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
