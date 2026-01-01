import { PackagesService } from './packages.service';
export declare class PackagesController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    findAll(): Promise<import("./package.entity").Package[]>;
    findOne(id: string): Promise<import("./package.entity").Package>;
}
