import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ForgoutPasswordPageComponent } from './pages/forgout-password-page/forgout-password-page.component';
import { EmailVerificationPageComponent } from './pages/email-verification-page/email-verification-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './guards/auth/auth.guard';


const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      {  path: 'login', component: LoginPageComponent, canActivate: [authGuard] },
      {  path: 'register', component: RegisterPageComponent, canActivate: [authGuard] },
      {  path: 'home', component: HomePageComponent},
      {  path: 'profile', component: ProfilePageComponent },
      {  path: 'forgout', component: ForgoutPasswordPageComponent },
      {  path: 'verify', component: EmailVerificationPageComponent },
      {  path: '**', component: LoginPageComponent },
    ]
  }
]




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthPracticeRoutingModule { }
