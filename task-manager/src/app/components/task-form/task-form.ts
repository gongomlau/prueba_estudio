import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: undefined,
    titulo: '',
    descripcion: '',
    completada: false,
    prioridad: 'Media',
  };

  isEditMode: boolean = false;
  taskId: number | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number): void {
    this.loading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (data) => {
        this.task = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = 'Error al cargar la tarea';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  isFormValid(): boolean {
    return this.task.titulo.trim().length > 0 && this.task.descripcion.trim().length > 0;
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, this.task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => (this.error = 'Error al actualizar'),
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => (this.error = 'Error al crear'),
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
