import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { courseLists } from "../data/courses";

const CourseListing = () => {
  return (
    <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(courseLists) && courseLists?.sort().map((course, i) => (
        <Card key={i} className="dark:bg-special-600 dark:border-special-600">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex"></CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between text-sm capitalize">
            <span>{course.level}</span>
            <span>Duration: {course.duration}</span>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default CourseListing;
