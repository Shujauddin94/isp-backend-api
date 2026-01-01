import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

    @Get('customer/:customerId')
    findByCustomer(@Param('customerId') customerId: string) {
        return this.subscriptionsService.findByCustomer(customerId);
    }
}
