import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Curso, CursoDetalle } from '../../core/models/curso.model';
import { CursoService } from '../../core/services/curso.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';  
import { InscripcionComponent } from '../inscripcion/inscripcion.component';
import { Inscripcion } from '../../core/models/inscripcion.model';
@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [CommonModule, TagModule, CardModule, InscripcionComponent, LoadingComponent, ButtonModule, TabsModule, RouterModule],
  templateUrl: './curso-detalle.component.html',
  styleUrl: './curso-detalle.component.scss'
})
export class CursoDetalleComponent {
  private cursoService = inject(CursoService);

  @ViewChild('inscripcionComponent') inscripcionComponent!: InscripcionComponent;
  curso: CursoDetalle = {} as CursoDetalle;
  mensaje: string = '';
  cargando: boolean = true;
  tabIndice: number = 0
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tabIndice = 0
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerDetalleCurso(id);
  }

  obtenerDetalleCurso(id: number): void {
    this.cursoService.obtenerCurso(id).pipe(
      catchError((errorResponse: any) => {
        //this.mensajeService.errorServicioConsulta(errorResponse);
        return EMPTY;
      }), finalize(() => { this.cargando = false })
    ).subscribe((respuesta: ApiResponse<CursoDetalle>) => {
      const { data, codigo } = respuesta;
      if (codigo == 200) {
        this.curso = data;
      }
    });
  }

  inscribirse(): void {
    this.inscripcionComponent.mostrarDialogo();
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  onInscrito(codigo: number): void {
    if(codigo===200)
      this.obtenerDetalleCurso(this.curso.id);
    
  }

  getColorNivel(nivel: string): string {
    switch (nivel.toLowerCase()) {
      case 'principiante': return 'success';
      case 'intermedio': return 'warning';
      case 'avanzado': return 'danger';
      default: return 'info';
    }
  }

  getCuposRestantes(curso: CursoDetalle): number {
    return curso.capacidad - curso.inscritos;
  }
}
