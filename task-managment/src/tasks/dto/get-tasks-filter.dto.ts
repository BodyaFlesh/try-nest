import { TaskStatus } from "../tast.model";

export class GetTasksFilterDto {
    status: TaskStatus;
    search: string
}