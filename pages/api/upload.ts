import Cloudinary from 'utility/cloudinary';
import { Request, Response, urlencoded, json } from 'express';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

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
  let folder = req.body?.folder || ('lms/uploads' as string);
  console.log(req.file, req.body);
  let cloud;
  if (req.file) {
    cloud = await Cloudinary.uploader(req?.file.path, folder);
  } else if (req.files) {
    cloud = await Cloudinary.uploader(req?.files, folder);
  } else {
    cloud = await Cloudinary.uploader(req.body.slides, folder);
  }
//   const image = await prisma.image.create({
//     data: { folder: folder, image: cloud?.secure_url as string },
//   });
//   if (!image) {
//     return res.status(500).json({ message: 'Image upload not completed' });
//   }
//   return res.json({ cloudinary: cloud?.secure_url, image: image.image });
  // console.log(cloud);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
