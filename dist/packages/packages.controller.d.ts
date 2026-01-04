import { PackagesService } from './packages.service';
import { Package } from './package.entity';
export declare class PackagesController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    create(data: Partial<Package>): Promise<Package>;
    findAll(): Promise<Package[]>;
    findOne(id: string): Promise<Package>;
    update(id: string, data: Partial<Package>): Promise<Package>;
    remove(id: string): Promise<void>;
}
