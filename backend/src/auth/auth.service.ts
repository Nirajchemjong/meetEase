import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return prisma.auth.create({
      data: createAuthDto,
    });
  }

  findAll() {
    return prisma.auth.findMany();
  }

  findOne(id: number) {
    return prisma.auth.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return prisma.auth.update({
      where: { id },
      data: updateAuthDto,
    });
  }

  remove(id: number) {
    return prisma.auth.delete({
      where: { id },
    });
  }
}
