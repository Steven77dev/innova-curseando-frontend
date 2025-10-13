import { Routes } from '@angular/router';
import { CursosComponent } from './app/presentation/cursos/cursos.component';
import { CursoDetalleComponent } from './app/presentation/curso-detalle/curso-detalle.component';
//import { CoursesComponent } from './pages/courses/courses.component';
//import { CourseDetailComponent } from './pages/courses/course-detail.component';

export const appRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'curso/:id', component: CursoDetalleComponent },
  { path: '**', redirectTo: '' }
];