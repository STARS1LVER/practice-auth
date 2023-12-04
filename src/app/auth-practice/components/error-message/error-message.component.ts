import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { validatorErrorMessage } from './validator-message';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

  @Input() public control!: AbstractControl;

  get errorMessage(): string{
    const error = this.control?.errors
    const validatorName = Object.keys( error ?? {})[0];
    return this.control.touched && validatorName // si esto es true
      ? validatorErrorMessage(validatorName) // llamamos a la funcion validatorErrorMessage
      : '' // si es false solo retorna un string vacio
  }
}
