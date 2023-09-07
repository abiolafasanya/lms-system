import { db } from "@/lib/db";
import QuestionPage from "./components/question";
import BackNavigation from "@/app/(dashboard)/component/back";

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
        <BackNavigation url="/student/assessment" />
      </section>
      <QuestionPage assessment={data} />
    </div>
  );
};

export default AssessmentPage;
