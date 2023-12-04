
/**
 *
 * Este archivo se hizo aparte para manejar los errores y este todo mas limpio:
 * primero creamos un interface
 *
 *
 *
 */



interface ErrorMessage  {
  // esto indica que puedes tener muchas propiedades string y que su tipo de dato es string
  [key: string]: string;
}

//  Los mensaje que mostraremos en los errores:
const errorMessage: ErrorMessage = {
  required: 'This field es required',
  pattern: 'Email must be Valid.',
  minlength: 'This field must be at leats 5 characters long.'
}


export function validatorErrorMessage( validatorName : string ): string {
 return  errorMessage[validatorName] ?? '';
}
