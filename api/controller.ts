import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { randomUUID } from 'crypto';
import {v4 as uuid} from 'uuid'

export default class Controller {
  static prisma = new PrismaClient();
  static bcrypt = bcrypt;
  static randomUUID = randomUUID;
  static uuid = uuid;
  static getSession = getSession;
  static User = this.prisma.user;
  static disconnect = async () => {
    await this.prisma.$disconnect();
    return this;
  };
}