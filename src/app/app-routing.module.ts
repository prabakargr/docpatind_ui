import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path:'appointments', component: AppointmentsComponent },
   {path: 'home',component:HomeComponent},
  { path:'',redirectTo:"login",pathMatch:"full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
