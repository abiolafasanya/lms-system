// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
  data?: any;
  status?: true;
  message?: string;
  error?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const question = await prisma.question.update({where: req.query, data: req.body})
  if(!question) {
    res.status(400).json({ error: true, message: 'update failed' })
    return
  }
  return res.status(200).json({ data: question, message: 'update successful' })
}