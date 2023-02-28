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
  const user = await prisma.user.findMany({orderBy: {createdAt: 'asc'}});
  //   console.log(user, 'result');
  if (!user)
    return res
      .status(400)
      .json({ error: true, message: 'Error Fetching users' });
  return res.status(200).json({ message: 'Users', data: user as typeof user });
}
