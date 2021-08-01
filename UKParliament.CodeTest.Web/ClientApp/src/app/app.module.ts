import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { EditpersonComponent } from './componenets/person/editperson/editperson.component';
import { ListpersonComponent } from './componenets/person/listperson/listperson.component';
import { AddpersonComponent } from './componenets/person/addperson/addperson.component';

import { PeopleService } from './services/peopleService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditpersonComponent,
    ListpersonComponent,
    AddpersonComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
