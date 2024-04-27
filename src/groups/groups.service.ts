import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupsService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create() {
    return await this.groupsRepository.save({});
  }

  async findAll() {
    const users = await this.groupsRepository.findAndCount();
    if (!users) throw new NotFoundException('Groups not found');
    return users;
  }

  async findOne(id: number) {
    const group = await this.groupsRepository.findOneBy({ id });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async addUserToGroup(groupId: number, userId: number) {
    const group = await this.findOne(groupId);
    const user = await this.usersService.findOne(userId); // todo: configure typeorm
    if (group.usersIds.includes(userId))
      throw new BadRequestException(
        'The user alredy has been added to the group before',
      );

    group.usersIds = [...group.usersIds, userId];

    if (group.usersIds.length === 1) group.status = 'notEmpty';
    await this.groupsRepository.save(group);
    user.groupId = groupId;
    await this.usersService.update(user.id, user);
    return { message: 'User successfully added to group', group };
  }

  async removeUserFromGroup(groupId: number, userId: number) {
    const group = await this.findOne(groupId);
    if (!group.usersIds.includes(userId))
      throw new BadRequestException('User not found in the group');

    group.usersIds = group.usersIds.filter((id) => id !== userId);
    if (group.usersIds.length === 0) group.status = 'empty';
    // todo: configure typeorm to sync entities
    const user = await this.usersService.findOne(userId);
    user.groupId = null;
    await this.usersService.update(userId, { ...user, groupId: null });
    const res = await this.groupsRepository.save(group);
    return { message: 'User removed from the group', userId, group: res };
  }

  async remove(id: number) {
    const res = await this.groupsRepository.delete(id);
    if (res.affected === 0) return new NotFoundException('Groups not found');
    return { message: 'Group successfully deleted', id };
  }
}
