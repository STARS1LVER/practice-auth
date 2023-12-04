import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

// - Creamos un tipo de dato
const actionType = {
  signIn:{
    action: 'signIn',
    title: 'Sign In'
  },
  signUp:{
    action: 'signUp',
    title: 'Sign Up'
  }
} as const // nos aseguramos de que sea una constante

type ActionType = keyof typeof actionType;



@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  // * le indicamos al input que solo recibira datos de typo
  @Input() public action!: ActionType;

  public authForm!: FormGroup;
  public title!: string;
  // esta propiedad tendra informacion de nuestro usuario
  public user$!: Observable<any>


  // * Inyectamos el formBuilder
  // private formBuilder = Inject(FormBuilder)
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  // * Con el readonly declaramos una propiedad que su valor no va a cambiar
  private readonly emailPattern =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  ngOnInit(): void {
    // * le damos el valor al titulo dependiendo del valor del action
    this.title =
      this.action === actionType.signIn.action
        ? actionType.signIn.title
        : actionType.signUp.title;


    // * Iniciamos el formulario:
    this.initForm()

    this.user$ = this.authService.userState$
  }





  public onSubmit() : void {
    const {email, password} = this.authForm.value;
    this.action === actionType.signIn.action
    ? this.authService.signIn(email, password)
    : this.authService.signUp(email, password)

  }

  /**
   * Validamos el campo si hay algun error en el formulario
   * @param field: string
   * @returns Boolean
   */
  public hasError(field: string): Boolean {
    const fieldName = this.authForm.get(field);
    return !!fieldName?.invalid && fieldName.touched;
  }

  public signInGoogle(): void {
    this.authService.signInGoogle()
  }

  /**
   * Un metodo privado que nos permite iniciar el
   * formulario
   */
  private initForm(): void {
    this.authForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.pattern(this.emailPattern) ]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

}
