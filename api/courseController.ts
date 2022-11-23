import { NextApiRequest, NextApiResponse } from 'next';
import { errType } from 'utility/types';
import Controller from './controller';

export default class courseController extends Controller {
  public static index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Course = this.prisma.course;
      const course = await Course.findMany({
        include: { user: true },
      });
      return res
        .status(200)
        .json({ success: true, message: 'Record results', course });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static show = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Course = this.prisma.course;
      const course = await Course.findFirst({
        where: { id: req.query.id as string },
      });
      if (course == null)
        return res.status(404).json({ message: 'Cannot find course' });
      return res
        .status(200)
        .json({ success: true, message: `Course ${course.id} result`, course });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static create = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    try {
      const Course = this.prisma.course;

      const user = await this.prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
      // console.log('here', user);

      if (!user) throw new Error('no user attached to course');

      const course = await Course.create({
        data: {
          title: body.title as string,
          content: body.content as string,
          category: body.category as string[],
          tags: body.tags as string[],
          userId: user.id as string,
          published: false as boolean,
        },
      });
      if (!course) throw new Error('Bad request check your inputs');
      return res
        .status(200)
        .json({ success: true, message: 'Record created', course });
    } catch (error) {
      res.status(500).json({ message: error });
    } finally {
      await this.prisma.disconnect();
    }
  };

  public static update = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    console.log(body);
    try {
      const Course = this.prisma.course;
      const course = await Course.update({
        where: { id: req.query.id as string },
        data: body,
      });
      // console.log(course);

      if (!course) throw new Error(`Invalid Input: ${req.query.id}`);
      return res
        .status(200)
        .json({ success: true, message: 'Record updated', course });
    } catch (error) {
      console.log(error);
      return new Error(error as errType);
    }
  };

  public static destroy = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Course = this.prisma.course;
      const course = await Course.delete({
        where: { id: req.query.id as string },
      });
      if (!course) throw new Error('Cannot find course');
      return res.status(200).json({ success: true, message: 'Course deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}
