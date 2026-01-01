import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';

@Injectable()
export class PackagesService {
    constructor(
        @InjectRepository(Package)
        private packagesRepository: Repository<Package>,
    ) { }

    async findAll(): Promise<Package[]> {
        return await this.packagesRepository.find({
            where: { isActive: true },
            order: { monthlyPrice: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Package> {
        const pkg = await this.packagesRepository.findOne({ where: { id } });
        if (!pkg) {
            throw new NotFoundException(`Package with ID ${id} not found`);
        }
        return pkg;
    }
}
