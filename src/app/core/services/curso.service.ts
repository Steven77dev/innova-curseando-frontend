import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { ApiResponse } from '../models/api-response';
import { Curso, CursoDetalle } from '../models/curso.model'; 
@Injectable({ providedIn: 'root' })
export class CursoService {

  private readonly baseUrl = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {}

  listarCursos(nivel: number): Observable<ApiResponse<Curso[]>> {
    let url = `${this.baseUrl}`
    if(nivel>0) url += `?nivel=${nivel}`;
    
    return this.http.get<ApiResponse<Curso[]>>(url);
  }

  obtenerCurso(id: number): Observable<ApiResponse<CursoDetalle>> {
    return this.http.get<ApiResponse<CursoDetalle>>(`${this.baseUrl}/${id}`);
  }
}
