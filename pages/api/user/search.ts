// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  data?: unknown;
  error?: boolean;
  success?: boolean;
  message?: string;
};

type bodyDoc = {
  id: string;
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: req.query,
  });
  if (!user || user === null) return res.json({ message: 'User not found' });
  return res.status(200).json({ message: 'Users', data: user as typeof user });
}
