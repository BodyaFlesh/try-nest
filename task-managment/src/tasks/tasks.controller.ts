import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tast.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
}
