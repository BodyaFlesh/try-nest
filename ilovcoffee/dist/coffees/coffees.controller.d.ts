import { CoffeesService } from './coffees.service';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(paginationQuery: any): import("./entities/coffee.entity").Coffee[];
    findOne(id: string): import("./entities/coffee.entity").Coffee;
    create(body: any): void;
    update(id: string, body: any): void;
    remove(id: string): void;
}
