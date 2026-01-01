import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('packages')
export class Package {
    @PrimaryColumn('varchar', { length: 36 })
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

    @Column('json')
    features: string[];

    @Column({ name: 'is_popular', default: false })
    isPopular: boolean;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
