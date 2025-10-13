export interface Curso {
  id: number;
  titulo: string;
  instructor: string;
  duracion: number;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  capacidad: number;
  disponibles: number;
  
}

export interface CursoDetalle extends Curso {
  
  descripcion: string;
  inscritos: number
  hayCupos: boolean
}