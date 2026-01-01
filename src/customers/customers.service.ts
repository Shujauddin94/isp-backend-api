import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) { }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = this.customersRepository.create({
            id: uuidv4(),
            ...createCustomerDto,
        });
        return await this.customersRepository.save(customer);
    }

    async findAll(): Promise<Customer[]> {
        return await this.customersRepository.find({
            relations: ['subscriptions', 'subscriptions.package', 'subscriptions.payments'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Customer> {
        const customer = await this.customersRepository.findOne({
            where: { id },
            relations: ['subscriptions', 'subscriptions.package', 'subscriptions.payments'],
        });

        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        return customer;
    }

    async update(id: string, updateData: Partial<Customer>): Promise<Customer> {
        await this.customersRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.customersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
    }
}
