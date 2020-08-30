import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get()
    findAll(@Query() paginationQuery){
        const { limit, offset } = paginationQuery;
        return 'this action returns all coffee';
    }


    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns ${id} coffee`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body){
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        return `This action returns ${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return `This action returns ${id} coffee`;
    }
}
