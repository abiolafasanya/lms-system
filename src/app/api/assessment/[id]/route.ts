import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

interface CustomError extends Error {
  response: { status: number; data: any };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const questions = await db.question
    .findMany({
      where: { assessmentId: params.id },
    })
    .finally(async () => await db.$disconnect());
  if (questions) {
    return NextResponse.json(questions);
  } else return NextResponse.json({ error: "No question found" });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const requestBody = await req.json();
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    const { question, option1, option2, option3, option4, answer } =
      requestBody;
    if (user?.emailAddresses[0].emailAddress) {
      const email = user?.emailAddresses[0].emailAddress;
      const findEligibleUser = await db.user
        .findFirst({ where: { email } })
        .finally(async () => await db.$disconnect());
      if (findEligibleUser?.role === UserRole.TUTOR) {
        const assessmentQuestion = await db.question.create({
          data: {
            assessmentId: params.id,
            question,
            option1,
            option2,
            option3,
            option4,
            answer,
          },
        });
        if (assessmentQuestion) {
          return NextResponse.json(
            { message: "Question created!", assessmentQuestion },
            { status: 201 }
          );
        } else {
          return NextResponse.json(
            { error: true, message: "Creation failed!" },
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

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const questionId = req.nextUrl.searchParams.get("questionId") || "";

  const question = await db.question
    .delete({
      where: { id: questionId },
    })
    .finally(async () => await db.$disconnect());
  if (question) {
    console.log(question, 'deleted');
    return NextResponse.json(
      { success: true, message: "Question removed!" },
      { status: 200 }
    );
  } else return NextResponse.json({ error: "Not found" });
}
