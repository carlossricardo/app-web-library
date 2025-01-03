import { AbstractControl, ValidationErrors } from '@angular/forms';


export function validarCedulaEcuatoriana(cedula: string): boolean {
    if (!cedula || cedula.length !== 10) {
      return false;
    }
  
    const digitoRegion = parseInt(cedula.substring(0, 2), 10);
    if (digitoRegion < 1 || digitoRegion > 24) {
      return false;
    }
  
    const tercerDigito = parseInt(cedula.charAt(2), 10);
    if (tercerDigito >= 6) {
      return false; 
    }
  
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificador = parseInt(cedula.charAt(9), 10);
    let suma = 0;
  
    for (let i = 0; i < coeficientes.length; i++) {
      let producto = coeficientes[i] * parseInt(cedula.charAt(i), 10);
      if (producto >= 10) {
        producto -= 9;
      }
      suma += producto;
    }
  
    const modulo = suma % 10;
    const resultado = modulo === 0 ? 0 : 10 - modulo;
  
    return resultado === digitoVerificador;
  }
  
  
  export function cedulaEcuatorianaValidator(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula || validarCedulaEcuatoriana(cedula)) {
      return null; 
    }
    return { cedulaInvalida: true };
  }
