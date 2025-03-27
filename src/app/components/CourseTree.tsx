import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

interface ResourceItem {
  title: string;
  link: string;
}

interface PYQResources {
  [year: string]: ResourceItem[];
}

interface CourseTreeProps {
  pyqs: PYQResources;
}

export default function CourseTree({ pyqs }: CourseTreeProps) {
  const [previewFileId, setPreviewFileId] = useState<string | null>(null);

  const isGoogleDriveOrDocsLink = (url: string): boolean => {
    return url.includes("drive.google.com") || url.includes("docs.google.com");
  };

  const extractDriveFileId = (url: string): string | null => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    return match ? match[1] : null;
  };

  const openPreview = (link: string) => {
    const fileId = extractDriveFileId(link);
    if (fileId) setPreviewFileId(fileId);
  };

  return (
    <Box>
      <SimpleTreeView>
        {Object.entries(pyqs).map(([year, files]) => (
          <TreeItem key={year} itemId={`year-${year}`} label={year}>
            {files.map((file, index) => (
              <TreeItem
                key={`${year}-${index}`} // Unique key
                itemId={`${year}-${index}`} // Unique itemId
                label={
                  <div className="flex items-center">
                    <a
                      href={file.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-blue-700 dark:text-blue-500 hover:underline"
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
                  </div>
                }
              />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>

      {/* Preview Modal */}
      {previewFileId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-1 rounded-lg shadow-lg w-full max-w-4xl relative">
            {/* Close Button */}
            <button
              onClick={() => setPreviewFileId(null)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded cursor-pointer text-lg"
            >
              ✖
            </button>

            {/* Responsive Iframe */}
            <div className="w-full h-[75vh] sm:h-[80vh]">
              <iframe
                src={`https://docs.google.com/viewer?srcid=${previewFileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
