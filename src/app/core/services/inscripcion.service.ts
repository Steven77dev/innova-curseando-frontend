import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { ApiResponse } from '../models/api-response'; 
import { Inscripcion } from '../models/inscripcion.model';
@Injectable({ providedIn: 'root' })
export class InscripcionService {

  private readonly baseUrl = 'http://localhost:8080/api/inscripcion';

  constructor(private http: HttpClient) {}

  inscribir(nombreCompleto: string, email: string, idCurso: number): Observable<ApiResponse<Inscripcion>> {
    const request = { nombreCompleto, email, idCurso };
    return this.http.post<ApiResponse<Inscripcion>>(this.baseUrl, request);
  }
}
