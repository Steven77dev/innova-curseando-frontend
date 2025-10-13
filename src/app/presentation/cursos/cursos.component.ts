import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Curso } from '../../core/models/curso.model';
import { CursoService } from '../../core/services/curso.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { TagModule } from 'primeng/tag';
import { LoadingComponent } from '../../shared/loading/loading.component';
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, LoadingComponent],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  private cursoService = inject(CursoService);

  nivelSeleccionado: number = 0
  cargando: boolean = false
  niveles = [
    { etiqueta: 'Todos', valor: 0, color: '#0056d2' },
    { etiqueta: 'Principiante', valor: 1, color: '#22c55e' },
    { etiqueta: 'Intermedio', valor: 2, color: '#f59e0b' },
    { etiqueta: 'Avanzado', valor: 3, color: '#ef4444' }
  ];

  cursos = signal<Curso[]>([])

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.listarCursos()
  }

  listarCursos() {
    this.cargando = true
    this.cursoService.listarCursos(this.nivelSeleccionado).pipe(
      catchError((errorResponse: any) => {
        //this.mensajeService.errorServicioConsulta(errorResponse);
        return EMPTY;
      }), finalize(() => {  this.cargando = false})
    ).subscribe((respuesta: ApiResponse<Curso[]>) => {
      const { data, codigo } = respuesta;
      if(codigo==200){
        this.cursos.set(data)
      }
    });
  }

  filtrarPorNivel(nivel: number): void {
    this.nivelSeleccionado = nivel
    this.listarCursos()
  }

  verDetalle(id: number): void {
    this.router.navigate(['/curso', id]);
  }

   getColorNivel(nivel: string): 'success' | 'info' | 'warning' {
    switch (nivel) {
      case 'principiante': return 'success';
      case 'intermedio': return 'info';
      case 'avanzado': return 'warning';
      default: return 'info';
    }
  }

}
