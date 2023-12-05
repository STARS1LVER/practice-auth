import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public user$!: Observable<User | null>

  private authService = inject(AuthService)

  constructor(){
    this.user$ = this.authService.userState$
  }

  public async onSignOut(): Promise<void> {
    await this.authService.signOut()
  }

}
