'use client';
import Link from "next/link";

interface CourseCardProps {
  id: string;
  name: string;
  code: string;
}

export default function CourseCard({ id, name, code }: CourseCardProps) {
  return (
    <Link href={`/course/${id}`}>
      <div className="border-[2] p-4 rounded-lg shadow hover:shadow-md hover:bg-sky-300 dark:hover:bg-sky-900 transition">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="opacity-75">{code}</p>
      </div>
    </Link>
  );
}
