import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('onboarding')
export class Onboarding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  documento: string;

  @Column()
  email: string;

  @Column('decimal')
  montoInicial: number;

  @Column({ default: 'REQUESTED' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
