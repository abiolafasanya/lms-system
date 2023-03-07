import { NextApiRequest, NextApiResponse } from 'next';
import { errType } from 'utility/types';
import Cloudinary from './cloudinary';
import Controller from './controller';

export default class taskcontroller extends Controller {
  public static index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Task = this.prisma.task;
      const task = await Task.findMany();
      return res
        .status(200)
        .json({ success: true, message: 'Record results', task });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static taskAndSubmission = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Task = this.prisma.task;
      const task = await Task.findUnique({
        where: { id: req.query.id as string },
        include: {
          Submission: {
            include: { user: true },
          },
        },
      });
      return res
        .status(200)
        .json({ success: true, message: 'Record results', task });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static show = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Task = this.prisma.task;
      const task = await Task.findFirst({
        where: { id: req.query.id as string },
      });
      if (task == null)
        return res.status(404).json({ message: 'Cannot find task' });
      return res
        .status(200)
        .json({ success: true, message: `Task ${task.id} result`, task });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  };

  public static create = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    let session = await this.getSession({req})
    let sessionId = session?.user.id as string
    try {
      const Task = this.prisma.task;

      const create = await Task.create({
        data: {
          title: body.title,
          description: body.description,
          attachment: body.attachment,
          point: parseInt(body.point),
          deadline: new Date(body.deadline),
          assignedTo: body.assignedTo,
          userId: sessionId,
        },
      })
        .then((data) => data)
        .catch((err) => console.log(err));
      // console.log({ task });
      if (!create) throw new Error('Bad request check your inputs');
      return res
        .status(200)
        .json({ success: true, message: 'Record created', task: create });
    } catch (error) {
      res.status(500).json({ message: error });
    } finally {
      await this.prisma.$disconnect();
    }
  };

  public static update = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    console.log(body);
    try {
      const Task = this.prisma.task;
      const task = await Task.update({
        where: { id: req.query.id as string },
        data: body,
      });

      if (!task) throw new Error(`Invalid Input: ${req.query.id}`);
      return res
        .status(200)
        .json({ success: true, message: 'Record updated', task });
    } catch (error) {
      console.log(error);
      return new Error(error as errType);
    }
  };

  public static destroy = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Task = this.prisma.task;
      const task = await Task.delete({ where: { id: req.query.id as string } });
      if (!task) throw new Error('Cannot find task');
      return res.status(200).json({ success: true, message: 'Task successfully removed 🗑' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export class Submission extends taskcontroller {
  public static submission = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      let { taskId, score, feedback } = req.body;
      const session = await this.getSession({req});
      // userId: session?.user.id as string;
      // taskId,
      const input = {
        score: parseInt(score),
        feedback,
        gradedAt: new Date(Date.now()),
        graded: true
      };

      const Submission = this.prisma.submission;
      console.log(input);
      const submission = await Submission.update({
        where: { id: req.query.id as string },
        data: input,
      })
        .then((data) => data)
        .catch((err) => {
          console.log(err);
          throw new Error(err as string);
        });
      return res.status(200).json({ status: true, submission });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  };

  public static submit = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    const session = await this.getSession({req});
    let params = {
      userId: session?.user.id as string,
      taskId: req.body.taskId,
      submission: req.body.file,
    }
    const submission = await this.prisma.submission.create({data: params})
      if (!submission) {
        return res.json({ message: 'Task submission failed 😔' });
      }
      return res.status(200).json({ message: 'Submission has been recieved 😊' });
  }
}