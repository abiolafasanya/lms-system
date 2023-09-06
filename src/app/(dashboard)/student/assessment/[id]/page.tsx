import { db } from "@/lib/db";
import QuestionPage from "./components/question";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const AssessmentPage = async ({ params }: { params: { id: string } }) => {
  const assessments = await db.assessment.findMany({
    where: { id: params.id },
    include: {
      questions: true,
    },
  });
  const data = assessments[0];
  return (
    <div>
      <section className="mt-20">
        <h2 className="text-xl font-semibold">Assessments</h2>
        <div className="text-gray-500 flex gap-1">
          <span>
            <Link href="/student/assessment" className="flex gap-1">
              <ArrowLeft className="back-arrow" /> Back
            </Link>
          </span>
        </div>
      </section>
      <QuestionPage assessment={data} />
    </div>
  );
};

export default AssessmentPage;
