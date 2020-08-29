import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'nest',
    database: 'nest',
    password: 'nest',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true 
};