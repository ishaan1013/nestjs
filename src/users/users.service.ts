import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'ENGINEER' | 'INTERN';
  }) {
    const usersByHighId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'ENGINEER' | 'INTERN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
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
