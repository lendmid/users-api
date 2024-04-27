import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

type T_GROUP_STATUS = 'empty' | 'notEmpty';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'empty',
    nullable: false,
  })
  status: T_GROUP_STATUS;

  @Column('int', { array: true, default: [] })
  usersIds: number[];

  @Exclude() // Excluding the relation object from appearing in the results because the user Id above is enough
  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'usersIds' })
  user: User;
}
