import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) { }

    @Post()
    create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionsService.create(createSubscriptionDto);
    }

    @Get()
    findAll() {
        return this.subscriptionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subscriptionsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: Partial<CreateSubscriptionDto>) {
        return this.subscriptionsService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subscriptionsService.remove(id);
    }

    @Get('customer/:customerId')
    findByCustomer(@Param('customerId') customerId: string) {
        return this.subscriptionsService.findByCustomer(customerId);
    }
}
