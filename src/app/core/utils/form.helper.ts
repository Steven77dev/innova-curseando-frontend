import { AbstractControl, FormGroup } from '@angular/forms';


export class FormHelper {
  constructor(private formGroup: FormGroup) { }

  obtenerMensajeError(control: AbstractControl, campo: string): string {
    if (control.errors) {
      if (control.errors['required']) {
        return `El campo ${campo} es obligatorio.`;
      }
      if (control.errors['pattern']) {
        return `El formato del campo ${campo} no es válido.`;
      }
      if (control.errors['minlength']) {
        return `El campo ${campo} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
      }
      if (control.errors['maxlength']) {
        return `El campo ${campo} debe tener como máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
      }
      if (control.errors['email']) {
        return `El campo ${campo} debe ser un correo válido.`;
      }
    }
    return this.obtenerMensajeErrorDefecto();
  }


  obtenerMensajeErrorDefecto(): string {
    return 'Campo requerido'
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formGroup.get(campo);
    if (!control) {
      return false;
    }

    if (control.disabled) {
      return control.value === '' && !!control.validator && control.touched
        ? true
        : control.invalid && control.touched;
    }


    return control.invalid && control.touched;
  }

  esClaseInvalido(campo: string): string {

    return this.esCampoInvalido(campo) ? 'ng-invalid ng-dirty' : '';

  }
}