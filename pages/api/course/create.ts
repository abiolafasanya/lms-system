import Cloudinary from 'utility/cloudinary';
import { Request, Response, urlencoded, json } from 'express';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc<Request, Response>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: `Something broke!. \n ${err}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

handler.use(urlencoded({ extended: true }));
handler.use(json());
handler.use(Cloudinary.multer.single('image'));

handler.post(async (req, res) => {
  let folder = 'lms/course';
  console.log(req.body, req.file);

  let cloud;
  if (req.file) {
    cloud = await Cloudinary.uploader(req?.file.path, folder);
  } else if (req.files) {
    cloud = await Cloudinary.uploader(req?.files, folder);
  } else {
    cloud = await Cloudinary.uploader(req.body.slides, folder);
  }

  const {name, description, requirements, userId} = req.body;
  const image ={ image: cloud?.secure_url as string}
  const data = {name, description, requirements,userId, ...image}
  const course = await prisma.course.create({
    data: data,
  });
  if (!course) {
    return res.status(500).json({ message: 'Course was not created' });
  }
  return res.json({ message:'course added', course });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
