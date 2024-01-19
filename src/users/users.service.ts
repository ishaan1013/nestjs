import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@company.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Jack Smith',
      email: 'jack@company.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Jill Parker',
      email: 'jill@company.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Jim Brown',
      email: 'jim@company.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role) {
      const rolesArr = this.users.filter((user) => user.role === role);
      if (!rolesArr.length) {
        throw new NotFoundException(`Users with role ${role} not found`);
      }
      return rolesArr;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
