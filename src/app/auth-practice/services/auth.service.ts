import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { Observable, retry } from 'rxjs';

interface ErrorsSignUp {
  code: string,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly auth = inject(Auth)
  private readonly router = inject(Router)
  private readonly googleProvider = new GoogleAuthProvider()

  constructor() {
  }

  // Se utiliza el signo dolar para indicar que sera un observable
  get userState$(){
     return authState(this.auth)
  }

  /**
   * Este metodo es para iniciar sesion con google
   * devuelve una promesa
   * no recibe parametros
   *
   */
  public async signInGoogle():Promise<void> {
    try {
      await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      console.log('Google Login', error);
    }
  }



  /**
   * Este metodo es para salir de la sesion
   * del usuario es el logout
   * aqui llamamos el auth que viene de Auth de angular fire
   * y llamamos el metodo signOut
   */
  public async signOut(): Promise<void>{
    try {
      await this.auth.signOut()
    } catch (error: unknown) {
      console.log(error)
    }
  }


  public async signUp(email: string, password: string ): Promise<void>{
    try {
      const {user} = await createUserWithEmailAndPassword(this.auth,email, password)
      this.sendEmailVerication(user)
      this.router.navigate(['/auth/verify'])
    } catch (error) {
      const {code, message} = error as ErrorsSignUp; // casteamos el error
      console.log(code);
    }
  }


  public async signIn(email: string, password: string ): Promise<void>{
    try {
      const {user} =  await signInWithEmailAndPassword(this.auth, email, password)
      this.checkUserIsVerify(user)


    } catch (error) {
      const {code, message} = error as ErrorsSignUp; // casteamos el error
      console.log(code);
    }
  }

  /**
   * Este metodo nos permite verificar el email
   * cuando nos estamos registrando
   */
  public async sendEmailVerication(userCredential: User): Promise<void> {
    const currentUser = {};
    try {
      await sendEmailVerification(userCredential)
    } catch (error) {
      console.log(error)
    }
  }


  public async sendPasswordResetEmail(email: string): Promise<void> {
    const currentUser = {};
    try {
      await sendPasswordResetEmail(this.auth, email)
    } catch (error) {
      console.log(error)
    }
  }

  private checkUserIsVerify(user: User): void {
    const route = user.emailVerified ? '/auth/profile' : '/auth/verify'
    this.router.navigate([route])

  }

}
