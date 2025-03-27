"use client";
import { useState } from "react";
import courses from "./data/courses.json";
import SearchAppBar from "./components/AppBar";
import CourseCard from "./components/CourseCard";

interface Course {
  name: string;
  code: string;
  resources: {
    PYQs?: { title: string; link: string }[];
    Assignments?: { title: string; link: string }[];
    ClassNotes?: { title: string; link: string }[];
    AMNotes?: { title: string; link: string }[];
  };
  externalLinks?: Record<string, string>;
}


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  console.log(courses);
  const courseEntries = Object.entries(courses);

  const filteredCourses = courseEntries.filter(([id, course]) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <SearchAppBar onSearch={setSearchQuery} /> {/* Pass search function */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(([id, course]) => (
            <CourseCard key={id} id={id} name={course.name} code={course.code} />
          ))
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </main>
  );
}
