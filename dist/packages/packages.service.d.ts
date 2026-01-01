import { Repository } from 'typeorm';
import { Package } from './package.entity';
export declare class PackagesService {
    private packagesRepository;
    constructor(packagesRepository: Repository<Package>);
    findAll(): Promise<Package[]>;
    findOne(id: string): Promise<Package>;
}
