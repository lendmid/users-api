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

  // @Column({ nullable: true })
  // profileId: number;  // <---------- You'll get only the id from here

  // @OneToOne(type => Profile)
  // @JoinColumn()
  // profile: Profile;  // <----------- You don't want all the data

  // @OneToMany(() => User, (user) => user.id, {
  //   cascade: true,
  //   eager: true,
  // })
  // // @JoinColumn()
  // usersIds: number[];

  // @OneToMany(() => User, (user) => user.id)
  // @JoinColumn()
  // user: User;

  @Exclude() // Excluding the relation object from appearing in the results because the user Id above is enough
  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'usersIds' })
  user: User;
}
