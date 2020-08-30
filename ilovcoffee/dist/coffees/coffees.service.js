"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const coffee_entity_1 = require("./entities/coffee.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flavor_entity_1 = require("./entities/flavor.entity");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
    }
    async findAll() {
        return await this.coffeeRepository.find({
            relations: ['flovors']
        });
    }
    async findOne(id) {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flovors']
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)));
        const coffee = await this.coffeeRepository.create(Object.assign(Object.assign({}, createCoffeeDto), { flavors }));
        return await this.coffeeRepository.save(coffee);
    }
    async update(id, updateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))));
        const coffee = await this.coffeeRepository.preload(Object.assign(Object.assign({ id: +id }, updateCoffeeDto), { flavors }));
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return await this.coffeeRepository.remove(coffee);
    }
    async preloadFlavorByName(name) {
        const exisitingFlavor = await this.flavorRepository.findOne({ name });
        if (exisitingFlavor) {
            return exisitingFlavor;
        }
        return await this.flavorRepository.create({ name });
    }
};
CoffeesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(coffee_entity_1.Coffee)),
    __param(1, typeorm_1.InjectRepository(flavor_entity_1.Flavor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map