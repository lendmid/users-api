import { Exclude } from 'class-transformer';
import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum E_USER_STATUS {
  active = 'active',
  pending = 'pending',
  blocked = 'blocked',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({
    type: 'enum',
    enum: E_USER_STATUS,
    default: E_USER_STATUS.active,
  })
  status: E_USER_STATUS;

  @Column({ nullable: true })
  groupId: number;

  @Exclude()
  @ManyToOne(() => Group, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  user: Group;
}
