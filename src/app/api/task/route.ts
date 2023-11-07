import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { UserRole } from '@prisma/client';

interface CustomError extends Error {
  response: { status: number; data: any };
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await db.task
    .findMany({ include: { user: { select: { name: true } } } })
    .finally(async () => await db.$disconnect());

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (user?.emailAddresses[0].emailAddress) {
    const email = user?.emailAddresses[0].emailAddress;
    const findUser = await db.user.findFirst({ where: { email } }).finally(async () => await db.$disconnect());
    if (!findUser) return new Response('User account not found', { status: 400 });
    const gradedTask = await db.grade.findUnique({
      where: { id: findUser?.id },
      select: { graded: true },
    });
    if (tasks) {
      const result = { tasks, graded: gradedTask };
      return NextResponse.json(result, { status: 200 });
    }
  } else return NextResponse.json({ error: 'No task found' });
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const requestBody = await req.json();
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    const { title, description, resources, deadline, point } = requestBody;
    if (user?.emailAddresses[0].emailAddress) {
      const email = user?.emailAddresses[0].emailAddress;
      const findEligibleUser = await db.user
        .findFirst({ where: { email } })
        .finally(async () => await db.$disconnect());
      console.log(findEligibleUser);
      if (findEligibleUser?.role === UserRole.TUTOR) {
        const data = {
          userId: findEligibleUser.id,
          title,
          description,
          resources,
          deadline: new Date(deadline),
          point,
        };
        const task = await db.task.create({ data }).finally(async () => await db.$disconnect());
        if (task) {
          return NextResponse.json({ message: 'Task created!', task }, { status: 201 });
        } else {
          return NextResponse.json({ error: true, message: 'Creation failed!' }, { status: 400 });
        }
      }
    }
  } catch (error) {
    console.error('Error Encountered', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || error.cause || error }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const taskId = req.nextUrl.searchParams.get('taskId') || '';
  console.log('task id', taskId);

  const task = await db.task
    .delete({
      where: { id: taskId },
    })
    .finally(async () => await db.$disconnect());
  if (task) {
    return NextResponse.json({ success: true, message: 'Task deleted!' }, { status: 200 });
  } else return NextResponse.json({ error: 'Not found' });
}
