'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courses } from '../data/courses';
import { Input } from '@/components/ui/input';

const CourseBar = () => {
  return (
    <section className="flex items-center justify-between my-20">
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Courses" />
        </SelectTrigger>
        <SelectContent className="">
          {courses.sort().map((course, i) => (
            <SelectItem key={`${i}_${Date.now()}`} value={course}>
              {course}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input type="search" className="w-[256px]" />
    </section>
  );
};

export default CourseBar;
