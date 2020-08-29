import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'nest',
    database: 'nest',
    password: 'nest',
    entities: [
        Task,
        User
    ],
    //entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true 
};