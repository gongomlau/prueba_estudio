import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.slice(0,20); // Limitar a 20 tareas para demo;
        this.filteredTasks = [...this.tasks];
        this.loading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
      },
      error: (err) => {
        this.error = 'Error al cargar las tareas';
        this.loading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
        console.error(err);
      },
    });
  }

  filterTasks(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.titulo.toLowerCase().includes(term)
    );
  }

  deleteTask(task: Task): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.titulo}"?`)) {
      this.taskService.deleteTask(task.id!).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id);
        },
        error: (err) => {
          this.error = 'Error al eliminar la tarea';
          console.error(err);
        }
      });
    }
  }
}
