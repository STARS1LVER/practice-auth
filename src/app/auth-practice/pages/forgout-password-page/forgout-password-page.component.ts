import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgout-password-page',
  templateUrl: './forgout-password-page.component.html',
  styleUrls: ['./forgout-password-page.component.css']
})
export class ForgoutPasswordPageComponent implements OnInit {

  private readonly emailPattern =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public email!: FormControl;
  public isEmailSent: boolean = false;

  private authService = inject(AuthService)


  ngOnInit(): void {
    this.initEmailField()
  }


  public hasError (): boolean {
    return !!this.email.invalid && this.email.touched
  }

  public async onSubmit (event: Event): Promise<void>{
    event?.stopPropagation()
    try {
      if( this.email.invalid ) return 
      this.isEmailSent = true
      await this.authService.sendPasswordResetEmail(this.email?.value)
    } catch (error) {
      this.isEmailSent = false
      console.log('reset password',error)
    }

  }



  private initEmailField(): void {
    this.email  = new FormControl('',
    [Validators.required, Validators.pattern(this.emailPattern)])
  }

}
