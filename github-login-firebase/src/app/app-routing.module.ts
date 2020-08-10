import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';


const redirectLoggedIn = () =>  redirectLoggedInTo(['']);
const redirectUnauthorized = () => redirectUnauthorizedTo(['signin']);


const routes: Routes = [{
  path:'',
  component:HomeComponent,
  canActivate:[AngularFireAuthGuard],
  data:{ authGuardPipe: redirectUnauthorized }
},
{
  path:'signin',
  component:SigninComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectLoggedIn}
},
{
  path:'signup',
  component:SignupComponent,
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
