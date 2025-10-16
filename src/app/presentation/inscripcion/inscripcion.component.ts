import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FormHelper } from '../../core/utils/form.helper';
import { InscripcionService } from '../../core/services/inscripcion.service';
import { Curso, CursoDetalle } from '../../core/models/curso.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { Inscripcion } from '../../core/models/inscripcion.model'; 
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageModule, InputTextModule, DialogModule, ButtonModule],
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.scss'
})
export class InscripcionComponent {

  private inscripcionService = inject(InscripcionService);

  @Output() inscrito = new EventEmitter<number>();
  @Input() curso!: CursoDetalle | null;
  form: FormGroup | any;
  formHelper !: any;
  mensaje: string = '';
  error: boolean = false;
  bloqueado: boolean = false;
  mostrarInscripcion: boolean = false;
  constructor(private fb: FormBuilder) {
    this.setearForm();
  }
  setearForm() {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]+$/), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    });
  }
  ngOnInit(): void {
    this.formHelper = new FormHelper(this.form);
    this.mensaje = '';

  }

  mostrarDialogo(): void {
    this.mostrarInscripcion = true;
    this.mensaje = '';
    this.form.reset();
    this.form.markAsUntouched();
  }

  inscribirse(): void {

    const { nombreCompleto, email } = this.form.value;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.curso) return;
    if (this.curso.inscritos >= this.curso.capacidad) {
      this.mensaje = 'Este curso ya está lleno. No es posible inscribirse.';
      return;
    }
    this.bloqueado = true
    this.inscripcionService.inscribir(nombreCompleto, email, this.curso.id).pipe(
      catchError((errorResponse: any) => {
        console.log(errorResponse);
        this.mensaje = errorResponse.error.mensaje || 'Ocurrió un error al procesar la inscripción. Por favor, inténtelo de nuevo más tarde.';
        this.error = true
        this.bloqueado = false;
        return EMPTY;
      }),
    ).subscribe((respuesta: ApiResponse<Inscripcion>) => {
      console.log(respuesta);
      const { data, mensaje, codigo } = respuesta;
      if (codigo == 200) {
        this.error = false
        this.inscrito.emit(codigo);
        setTimeout(() => {
          this.bloqueado = false;
          this.cerrar()
        }, 1200);
      } else {
        this.error = true;
      }
      this.mensaje = mensaje;
    });

  }


  cerrar() {
    this.mostrarInscripcion = false;
  }
}
