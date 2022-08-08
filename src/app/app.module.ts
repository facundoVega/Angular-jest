import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { DataComponent } from './data/data.component';
import { AsynchronousComponent } from './asynchronous/asynchronous.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    DataComponent,
    AsynchronousComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
