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
  id?: string;
  role?: string;
  username?: string;
  name?: string;
  image?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.method);
  if (req.method === 'GET') {
    // console.log(req.query);
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: req.query,
    });
    // console.log(user, 'result');
    if (!user) return res.json({ error: true, message: 'fetch failed' });
    return res.status(200).json({ message: 'User', data: user });
  }

  if (req.method === 'PATCH') {
    // console.log(req.query);
    const body: bodyDoc = req.body;
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: req.query,
      data: body,
    });
    // console.log(user, 'result');
    if (!user) return res.json({ error: true, message: 'update failed' });
    return res.status(200).json({ message: 'Account updated', data: user });
  }

  if (req.method === 'PUT') {
    // console.log(req.query);
    const body: bodyDoc = req.body;
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: req.query,
      data: body,
    });
    // console.log(user, 'result');
    if (!user) return res.json({ error: true, message: 'update failed' });
    return res.status(200).json({ message: 'Account updated', data: user });
  }

  if (req.method === 'DELETE') {
    const prisma = new PrismaClient();
    const user = await prisma.user.delete({
      where: req.query,
    });
    //   console.log(user, 'result');
    if (!user) return res.json({ error: true, message: 'removal failed' });
    return res.status(200).json({ message: 'User removed successfully' });
  }
}
