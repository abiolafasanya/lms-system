import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

interface CustomError extends Error {
  response: { status: number; data: any };
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await db.submission
    .findMany({
      include: {
        grade: {
          select: {
            id: true,
            feedback: true,
            graded: true,
            score: true,
          },
        },
        user: { select: { name: true, id: true } },
        task: { select: { id: true, title: true, point: true } },
      },
    })
    .finally(async () => await db.$disconnect());
    
  if (submissions) {
    return NextResponse.json(submissions);
  } else return NextResponse.json({ error: "No submissions found" });
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const requestBody = await req.json();
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    const { attachment, description } = requestBody;
    if (user?.emailAddresses[0].emailAddress) {
      const email = user?.emailAddresses[0].emailAddress;
      const findEligibleUser = await db.user
        .findFirst({ where: { email } })
        .finally(async () => await db.$disconnect());

      const taskId = req.nextUrl.searchParams.get("taskId") || "";

      if (findEligibleUser?.role === UserRole.TUTOR) {
        const submission = await db.submission
          .create({
            data: {
              attachment,
              taskId,
              userId: findEligibleUser.id,
            },
          })
          .finally(async () => await db.$disconnect());
        if (submission) {
          return NextResponse.json(
            { message: "Submitted!", submission },
            { status: 201 }
          );
        } else {
          return NextResponse.json(
            { error: true, message: "Submission failed!" },
            { status: 400 }
          );
        }
      }
    }
  } catch (error) {
    console.error("Error Encountered while doing registration", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || error.cause || error },
        { status: 500 }
      );
    }
  }
}
