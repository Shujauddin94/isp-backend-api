import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity('customers')
export class Customer {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'cnic_passport' })
  cnicPassport: string;

  @Column({ name: 'mobile_number' })
  mobileNumber: string;

  @Column({ unique: true })
  email: string;

  @Column('text')
  address: string;

  @Column({ name: 'home_address', type: 'text' })
  homeAddress: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Subscription, subscription => subscription.customer)
  subscriptions: Subscription[];
}
