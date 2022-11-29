import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PigTableComponent } from './pig-table/pig-table.component';
import { PigCreateFormComponent } from './pig-create-form/pig-create-form.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MoreInfoPageComponent } from './more-info-page/more-info-page.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePigPageComponent } from './create-pig-page/create-pig-page.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [AppComponent, PigTableComponent, PigCreateFormComponent,  MoreInfoPageComponent, DeletePageComponent, HomePageComponent, CreatePigPageComponent, MapComponent  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,HttpClientModule,  NoopAnimationsModule,ReactiveFormsModule ],
  providers: [],
  entryComponents:[],
  bootstrap: [AppComponent],
})
export class AppModule {}
