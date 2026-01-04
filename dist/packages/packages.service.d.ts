import { Repository } from 'typeorm';
import { Package } from './package.entity';
export declare class PackagesService {
    private packagesRepository;
    constructor(packagesRepository: Repository<Package>);
    findAll(): Promise<Package[]>;
    findOne(id: string): Promise<Package>;
    create(data: Partial<Package>): Promise<Package>;
    update(id: string, data: Partial<Package>): Promise<Package>;
    remove(id: string): Promise<void>;
}
