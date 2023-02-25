import { Grade } from '@prisma/client';
import { error } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'os';
import { errType } from 'utility/types';
import Controller from './controller';

export default class assessmentController extends Controller {
  public static index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Assessment = this.prisma.assessment;
      const assessments = await Assessment.findMany().finally(async () => {
        await this.prisma.$disconnect();
      });
      return res
        .status(200)
        .json({ success: true, message: 'Record results', assessments });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static show = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Assessment = this.prisma.assessment;
      const assessment = await Assessment.findFirst({
        where: { id: req.query.id as string },
      });
      if (assessment == null)
        return res.status(404).json({ message: 'Cannot find assessment' });
      return res.status(200).json({
        success: true,
        message: `Assessment ${assessment.id} result`,
        assessment,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static create = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    try {
      const Assessment = this.prisma.assessment;
      const session = await this.getSession();
      console.log(session);
      // const user = await this.prisma.user.findFirst({
      //   where: {
      //     email: req.body.email,
      //   },
      // });
      // if (!user) throw new Error('no user attached to assessment');
      const assessment = await Assessment.create({
        data: body,
      });
      if (!assessment) throw new Error('Bad request check your inputs');
      return res
        .status(200)
        .json({ success: true, message: 'Record created', assessment });
    } catch (error) {
      res.status(500).json({ message: error });
    } finally {
      await this.prisma.$disconnect();
    }
  };

  public static question = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    let body = req.body;
    try {
      const Question = this.prisma.question;
      console.log(req.body);
      const question = await Question.create({
        data: body,
      })
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((error) => console.log(error));
      console.log('passed', question);
      if (!question) throw new Error('Bad request check your inputs');
      return res
        .status(200)
        .json({ success: true, message: 'Question Added', question });
    } catch (error) {
      res.status(500).json({ message: error });
    }
    // finally {
    // await this.prisma.$disconnect();
    // }
  };

  public static addManyquestion = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    let body = req.body;
    try {
      const Question = this.prisma.question;
      console.log(req.body);
      const question = await Question.create({
        data: body,
      })
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((error) => console.log(error));
      console.log('passed', question);
      if (!question) throw new Error('Bad request check your inputs');
      return res
        .status(200)
        .json({ success: true, message: 'Question Added', question });
    } catch (error) {
      res.status(500).json({ message: error });
    }
    // finally {
    // await this.prisma.$disconnect();
    // }
  };

  public static update = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    try {
      const Question = this.prisma.question;
      const question = await Question.update({
        where: { id: req.query.id as string },
        data: body,
      });
      // console.log({ updated: question });

      if (!question) throw new Error(`Invalid Input: ${req.query.id}`);
      return res
        .status(200)
        .json({ success: true, message: 'Record updated', question });
    } catch (error) {
      console.log(error);
      return new Error(error as errType);
    }
  };

  public static updateAssessment = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      const body = req.body;
      const Assessment = this.prisma.assessment;
      const assessment = await Assessment.update({
        where: { id: req.query.id as string },
        data: body,
      });
      if (!assessment) throw new Error('Assessment not found');
      return res.status(200).json({
        message: 'Assessment updated successfully',
        assessment,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  };

  public static destroy = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Assessment = this.prisma.assessment;
      const assessment = await Assessment.delete({
        where: { id: req.query.id as string },
      });
      if (!assessment) throw new Error('Cannot find assessment');
      return res
        .status(200)
        .json({ success: true, message: 'Assessment deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static grade = async (req: NextApiRequest, res: NextApiResponse) => {
    interface gradeData {
      userId: string;
      assessmentScore: number;
      assessmentId: string;
    }
    try {
      const body = req.body as gradeData;
      const Grade = this.prisma.grade;
      const findId = await this.prisma.grade.findFirst({
        where: { userId: body.userId },
      });
      const foundAssessment = findId?.assessmentId as string;
      let id: string;
      if (findId) {
        id = findId.id;
      } else id = ''

      const grade = await Grade.upsert({
        create: body,
        update: body,
        where: { id: id },
      });

      console.log(grade);
      if (!grade) throw new Error('Error occured while recording!');
      return res.status(200).json({ success: true, message: 'Grade recorded' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  };
}
