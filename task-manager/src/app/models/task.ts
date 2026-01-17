export interface Task {
  id?: number;
  titulo: string;
  descripcion:string;
  completada:boolean;
  prioridad: 'Baja' | 'Media' | 'Alta';
}
