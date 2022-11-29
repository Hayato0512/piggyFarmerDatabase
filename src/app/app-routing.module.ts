// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
// import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AppComponent } from './app.component';
import { CreatePigPageComponent } from './create-pig-page/create-pig-page.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MoreInfoPageComponent } from './more-info-page/more-info-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'more/:id', component: MoreInfoPageComponent },
  { path: 'delete/:id', component: DeletePageComponent },
  { path: 'create', component: CreatePigPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }