import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse} from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    // console.log(req.body,"notification")
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { courseId, assessmentId, taskId, isCompleted, lastVisit, lastOperation } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: { id: true },
  });

  const progress = await prisma.progress.create({
    data: {
      user: { connect: { id: user?.id } },
      course: courseId ? { connect: { id: courseId } } : undefined,
      assessment: assessmentId ? { connect: { id: assessmentId } } : undefined,
      task: taskId ? { connect: { id: taskId } } : undefined,
      isCompleted,
    },
  });

  const visit = await prisma.visit.create({
    data: {
      user: { connect: { id: user?.id } },
      lastVisit: new Date(lastVisit),
      lastOperation,
    },
  });

  res.status(200).json({ progress, visit });
}
