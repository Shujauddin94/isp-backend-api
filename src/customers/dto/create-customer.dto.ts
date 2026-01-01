import { IsString, IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    cnicPassport: string;

    @IsString()
    @IsNotEmpty()
    mobileNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    homeAddress: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
