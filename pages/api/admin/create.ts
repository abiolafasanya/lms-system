// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

type Data = {
  data?: unknown;
  error?: boolean;
  message?: string;
};

let password = process.env.ADMIN_PASSWD as string;
const username = process.env.ADMIN_USERNAME as string;
const name = process.env.ADMIN_NAME as string;
const email = process.env.ADMIN_EMAIL as string;
const role = 'admin';
const emailVerified = new Date(Date.now());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  password = await bcrypt.hash(password, 10);
  const body = { name, username, email, password, role, emailVerified };
  const prisma = new PrismaClient();
  const admin = await prisma.user.create({ data: body });
  if (!admin) return res.json({ message: 'Error creating' });
  res.status(200).json({ message: 'Admin created', data: admin });
  return;
}
