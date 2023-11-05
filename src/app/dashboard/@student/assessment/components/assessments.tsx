import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import Link from 'next/link';

const Assessments = async () => {
  const assessments = await db.assessment.findMany();
  return (
    <section className="flex flex-col space-y-5 mt-10 w-full">
      {Array.isArray(assessments) && assessments.length > 0 ? (
        assessments.map((assessment) => (
          <Card className="rounded-md shadow-md dark:bg-special-600 dark:border-0" key={assessment.id}>
            <CardHeader className="p-0 px-6 pt-2">
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full p-0 px-6 pb-2 justify-between items-center">
              <CardDescription className="text-sm">{assessment.description}</CardDescription>
              <Link href={`/dashboard/assessment/${assessment.id}`}>
                <Button>Start</Button>
              </Link>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="card">No Assessment</div>
      )}
    </section>
  );
};

export default Assessments;
