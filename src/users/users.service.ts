import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(user: any): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async update(id: number, user: any): Promise<User> {
    const userToUpdate = await this.userModel.findByPk(id);

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    return userToUpdate.update(user);
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.userModel.destroy({
      where: { id },
    });

    if (!deleted) {
      return 'User not found';
    }

    return 'User deleted successfully';
  }
}
