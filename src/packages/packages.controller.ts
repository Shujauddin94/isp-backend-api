import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Package } from './package.entity';

@Controller('packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) { }

    @Post()
    create(@Body() data: Partial<Package>) {
        return this.packagesService.create(data);
    }

    @Get()
    findAll() {
        return this.packagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.packagesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Partial<Package>) {
        return this.packagesService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.packagesService.remove(id);
    }
}
