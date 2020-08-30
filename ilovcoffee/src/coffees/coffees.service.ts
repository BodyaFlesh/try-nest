import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ){}

    async findAll(paginationQuery: PaginationQueryDto){
        const { limit, offset } = paginationQuery;

        return await this.coffeeRepository.find({
            relations: ['flovors'],
            skip: offset,
            take: limit
        });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flovors']
        });
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return coffee;
    }

    async create(createCoffeeDto:CreateCoffeeDto){
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        )

        const coffee = await this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return await this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
        const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))));

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });

        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string){
        const coffee = await this.findOne(id);
        return await this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor>{
        const exisitingFlavor = await this.flavorRepository.findOne({ name });
        if(exisitingFlavor){
            return exisitingFlavor;
        }
        return await this.flavorRepository.create({ name });
    }
}
