import Cloudinary from 'utility/cloudinary';
import { Request, Response, urlencoded, json } from 'express';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

const handler = nc<Request, Response>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: `Something broke!. \n ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

handler.use(urlencoded({ extended: true }));
handler.use(json());
handler.use(Cloudinary.multer.single('upload'));

handler.post(async (req, res) => {
  let folder = 'lms/tasks'
  let file;
  if (req.file) {
    file = await Cloudinary.uploader(req?.file.path, folder).then(data => data?.secure_url);
  } else {
    file = req.body.upload;
  }
  
  const session = await getSession({req});
  let params = {
    userId: session?.user.id as string,
    taskId: req.body.taskId,
    submission: file,
  }

  const submission = await prisma.submission.create({data: params})
    if (!submission) {
      return res.json({ message: 'Task submission failed 😔' });
    }
    return res.status(200).json({ message: 'Submission has been recieved 😊' });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
