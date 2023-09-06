import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface CustomError extends Error {
  response: {status: number, data: any}
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const {id} = requestBody
    const assessment = await db.assessment.findFirst({
        where: { id: id },
        include: {
          questions: true,
        },
      });

    //   new Response({})
    
   
  } catch (error) {
    console.error("Error Encountered while doing registration", error);
    const err =
      error instanceof Error
        ? error
        : new Error("Error Encountered while doing registration");
    return NextResponse.json({ error: err.message || err.cause || err }, { status: 500 });
  }
}