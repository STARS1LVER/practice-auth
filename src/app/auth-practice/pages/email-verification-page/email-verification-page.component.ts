import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, delay, filter, tap } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.css']
})
export class EmailVerificationPageComponent {

  public user$!:User | null

  private authService = inject(AuthService)

  constructor(){
    this.authService.userState$
    .pipe(
      filter((authState) => authState !== null),
      tap((user) => this.user$ = user),
      // tap(() => this.authService.signOut())
    )
    .subscribe()

  }

  public onResendEmail(): void{
    if(this.user$){
      this.authService.sendEmailVerication(this.user$)
    }
  }

}
