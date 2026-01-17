import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<any[]>(this.url).pipe(
      map((data) =>
        data.map((item) => ({
          id: item.id,
          titulo: item.title,
          descripcion: '',
          completada: item.completed,
          prioridad: 'Media',
        })),
      ),
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((item) => ({
        id: item.id,
        titulo: item.title,
        descripcion: '',
        completada: item.completed,
        prioridad: 'Media',
      })),
    );
  }

  createTask(task: Task): Observable<any> {
    return this.http.post<any>(this.url, {
      title: task.titulo,
      completed: task.completada,
      userId: 1,
    });
  }

  updateTask(id: number, task: Task): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, {
      title: task.titulo,
      completed: task.completada,
      userId: 1,
    });
  }
  deleteTask(id: number): Observable<any> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
