import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(pagination: FindUserDto) {
    const { name, email, ...rest } = pagination;
    const where = {} as FindUserDto;

    if (name) where.name = name;
    if (email) where.email = email;
    const [users, count] = await this.usersRepository.findAndCount({
      where,
      ...rest,
    });
    if (!users) throw new NotFoundException('Users not found');
    return { data: users, filters: pagination, total: count };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateStatus(id: number, updateUserDto: UpdateUserStatusDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found');
    user.status = updateUserDto.status;
    return await this.usersRepository.save(user);
  }

  async updateStatuses(updateUserDto: UpdateUserStatusDto[]) {
    // 1. the best way to do save in bulk is using queus like rabit/kafka
    // on UI usualy use statuses to display state loading/not loading
    // 2. Another way is to use socket if there are a lot of operations

    updateUserDto.forEach(({ id, status }) => {
      this.updateStatus(id, { status });
    });
    return {
      message: 'Users put in queue, the operation is executing',
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found');
    user = { ...user, ...updateUserDto };
    await this.usersRepository.save(user);
    return { message: 'User successfully updated', id };
  }

  async remove(id: number) {
    const res = await this.usersRepository.delete(id);
    if (res.affected === 0) throw new BadRequestException('User not found');
    return { message: 'User successfully deleted', id };
  }
}
