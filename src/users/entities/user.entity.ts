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

  @Exclude() // Excluding the relation object from appearing in the results because the user Id above is enough
  @ManyToOne(() => Group, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  user: Group;
  // @Column({ nullable: true })
  // groupId: number;

  // @Column({ nullable: true })
  // @ManyToOne(() => Group, (group) => group.id, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn()
  // groupId: number;
  // @JoinColumn()
  // @ManyToOne(() => Group, (group) => group.id, { cascade: true, eager: true })
  // @ManyToOne(() => Group, (group) => group.id, {
  //   // eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn({ name: 'groupId' })
}
