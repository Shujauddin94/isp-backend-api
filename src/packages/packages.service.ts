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

    async create(data: Partial<Package>): Promise<Package> {
        const pkg = this.packagesRepository.create(data);
        return this.packagesRepository.save(pkg);
    }

    async update(id: string, data: Partial<Package>): Promise<Package> {
        await this.packagesRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.packagesRepository.delete(id);
    }
}
