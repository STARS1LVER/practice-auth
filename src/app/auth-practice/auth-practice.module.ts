import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// * Components --------------------------------------------------------------------
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { EmailVerificationPageComponent } from './pages/email-verification-page/email-verification-page.component';
import { ForgoutPasswordPageComponent } from './pages/forgout-password-page/forgout-password-page.component';
import { AuthPracticeRoutingModule } from './auth-practice-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';


import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    ProfilePageComponent,
    RegisterPageComponent,
    LayoutPageComponent,
    EmailVerificationPageComponent,
    ForgoutPasswordPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    AuthPracticeRoutingModule,
    ReactiveFormsModule,
    AuthFormComponent,
    ErrorMessageComponent

  ]
})
export class AuthPracticeModule { }
