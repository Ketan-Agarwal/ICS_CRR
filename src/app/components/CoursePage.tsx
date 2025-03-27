import { useState } from "react";
import CourseTree from "../components/CourseTree";

interface ResourceItem {
  title: string;
  link: string;
}

interface CoursePageProps {
  id: string;
  course: {
    name: string;
    code: string;
    resources: {
      PYQs: { [year: string]: ResourceItem[] };
      Assignments: ResourceItem[];
      ClassNotes: ResourceItem[];
      AMNotes: ResourceItem[];
    };
    externalLinks?: ResourceItem[];
  };
}

export default function CoursePage({ id, course }: CoursePageProps) {
  const [previewFileId, setPreviewFileId] = useState<string | null>(null);

  // Check if the link is from Google Drive or Google Docs
  const isGoogleDriveOrDocsLink = (url: string): boolean => {
    return url.includes("drive.google.com") || url.includes("docs.google.com");
  };

  // Extract Google Drive File ID from link
  const extractDriveFileId = (url: string): string | null => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    return match ? match[1] : null;
  };

  const openPreview = (link: string) => {
    const fileId = extractDriveFileId(link);
    if (fileId) setPreviewFileId(fileId);
  };

  return (
    <main className="mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">{course.name} ({course.code})</h1>

      {/* Resources Grid */}
      <h2 className="text-2xl font-semibold mb-3">Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* PYQs with TreeView */}
        <div>
          <h2 className="text-xl font-semibold mb-2">PYQs</h2>
          <CourseTree pyqs={course.resources.PYQs} />
        </div>

        {/* Assignments */}
        <ResourceList title="Assignments" items={course.resources.Assignments} openPreview={openPreview} />

        {/* Class Notes */}
        <ResourceList title="Class Notes" items={course.resources.ClassNotes} openPreview={openPreview} />

        {/* AM Notes */}
        <ResourceList title="AM Notes" items={course.resources.AMNotes} openPreview={openPreview} />
      </div>

      {/* External Links Section */}
      {course.externalLinks && course.externalLinks.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">External Links</h2>
          <ul className="list-disc list-outside  text-blue-700 dark:text-blue-500">
            {course.externalLinks.map((item) => (
              <li key={item.title}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline ">
                  {item.title}
                </a>
                {isGoogleDriveOrDocsLink(item.link) && (
                  <button
                    onClick={() => openPreview(item.link)}
                    className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Preview
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Back to Courses */}
      <div className="mt-6">
        <a href="/" className="text-blue-500 hover:underline">⬅ Back to Courses</a>
      </div>

      {/* Preview Modal */}
      {previewFileId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-1 rounded-lg shadow-lg w-full max-w-4xl relative">
            <button
              onClick={() => setPreviewFileId(null)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded cursor-pointer text-lg"
            >
              ✖
            </button>


            <div className="w-full h-[75vh] sm:h-[80vh]">
              <iframe
                src={`https://docs.google.com/viewer?srcid=${previewFileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

interface ResourceListProps {
  title: string;
  items: ResourceItem[];
  openPreview: (link: string) => void;
}

function ResourceList({ title, items, openPreview }: ResourceListProps) {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc list-outside ">
        {items.map((file, index) => (
          <li key={index} className="">
            <a
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline  text-blue-700 dark:text-blue-500"
              
            >
              {file.title}
            </a>
            {isGoogleDriveOrDocsLink(file.link) && (
              <button
                onClick={() => openPreview(file.link)}
                className="ml-2 px-2 py-1 text-xs cursor-pointer bg-blue-500 text-white rounded"
              >
                Preview
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function isGoogleDriveOrDocsLink(url: string): boolean {
  return url.includes("drive.google.com") || url.includes("docs.google.com");
}
