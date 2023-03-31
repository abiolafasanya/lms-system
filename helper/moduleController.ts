import { NextApiRequest, NextApiResponse } from 'next';
import Controller from './controller'

export default class moduleController extends Controller {
    public static createModule = async (req: NextApiRequest, res: NextApiResponse) => {
        try{
          const curriculum = await this.prisma.module.create({
            data: {
              title: req.body.title as string,
              courseId: req.query.id as string,
            },
          });
          if(!curriculum) {
            return res.status(400).json({error: true, message: 'Error occured while creating'})
          }
          return res.status(200).json({error: false, message: 'Module created!', data: curriculum})
        } catch (error) {
          return res.status(500).json({message: error})
        }
      }


      public static lesson = async (req: NextApiRequest, res: NextApiResponse) => {
        console.log(req.body)
        try{
          const lesson = await this.prisma.lesson.create({
            data: req.body,
          });
          if(!lesson) {
            return res.status(400).json({error: true, message: 'Error occured while saving'})
          }
          return res.status(200).json({error: false, message: 'Lesson saved!', data: lesson})
        } catch (error) {
          return res.status(500).json({message: error})
        }
      }

      public static destroy = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
          const course = await this.prisma.module.delete({
            where: { id: req.query.id as string },
          });
          if (!course) throw new Error('Cannot find course');
          return res.status(200).json({ success: true, message: 'Course deleted' });
        } catch (error) {
          res.status(500).json({ message: error });
        }
      };

}