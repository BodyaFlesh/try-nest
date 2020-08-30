import { Coffee } from './entities/coffee.entity';
import { Repository, Connection } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly connection;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>, connection: Connection);
    findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]>;
    findOne(id: string): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: string): Promise<Coffee>;
    recommendCoffee(coffee: Coffee): Promise<void>;
    private preloadFlavorByName;
}
