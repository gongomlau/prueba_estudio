import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'https://jsonplaceholder.typicode.com/todos ';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  getTaskById(id:number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${id}`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post<any>(this.url, task);
  }
  updateTask(id:number, task: Task): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, task);
  }
  deleteTask(id: number): Observable<any> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
