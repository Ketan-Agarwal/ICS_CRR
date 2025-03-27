"use client";
import { useParams } from "next/navigation";
import courses from "../../data/courses.json";
import SearchAppBar from "../../components/AppBarBasic";
import CoursePage from "../../components/CoursePage";
import { Course } from "@/app/types/courses";

export default function CourseWrapper() {
  const { id } = useParams();
  const course = courses[id as keyof typeof courses];

  if (!course) {
    return <div className="text-center text-2xl text-gray-500 mt-10">Course {id} not found</div>;
  }

  return (
    <>
      <SearchAppBar />
      {console.log(course)}
      <CoursePage id={id as string} course={course as Course} />
    </>
  );
}
