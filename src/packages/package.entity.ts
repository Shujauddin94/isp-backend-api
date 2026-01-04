import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('packages')
export class Package {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    speed: string;

    @Column('decimal', { name: 'monthly_price', precision: 10, scale: 2 })
    monthlyPrice: number;

    @Column('decimal', { name: 'three_months_price', precision: 10, scale: 2 })
    threeMonthsPrice: number;

    @Column('decimal', { name: 'yearly_price', precision: 10, scale: 2 })
    yearlyPrice: number;

    @Column('jsonb')
    features: string[];

    @Column('decimal', { name: 'penalty_rate', precision: 5, scale: 2, default: 0 })
    penaltyRate: number;

    @Column({ name: 'is_popular', default: false })
    isPopular: boolean;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
