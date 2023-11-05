import { db } from '@/lib/db';
import QuestionPage from './components/question';
import Breadcrumbs from '@/components/shared/breadcrumb/Breadcrumbs';

const AssessmentPage = async ({ params }: { params: { id: string } }) => {
  const assessments = await db.assessment
    .findMany({
      where: { id: params.id },
      include: {
        questions: true,
      },
    })
    .finally(async () => await db.$disconnect());
  const data = assessments[0];
  return (
    <div>
      <section className="mt-20">
        <h2 className="text-xl font-semibold">Assessments</h2>
        <Breadcrumbs />
      </section>
      <QuestionPage assessment={data} />
    </div>
  );
};

export default AssessmentPage;
