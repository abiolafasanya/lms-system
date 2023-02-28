// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  data?: any;
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
  const { role, id }: bodyDoc = req.body;
  const prisma = new PrismaClient();
  const user = await prisma.user.update({
    where: { id: id },
    data: { role: role },
  });
  //   console.log(user, 'result');
  if (!user)
    return res.status(400).json({ error: true, message: 'Role update failed' });
  return res.status(200).json({ message: 'Role updated successfully' });
}
