import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { PaymentCycle } from '../subscription.entity';

export class CreateSubscriptionDto {
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    packageId: string;

    @IsEnum(PaymentCycle)
    paymentCycle: PaymentCycle;
}
