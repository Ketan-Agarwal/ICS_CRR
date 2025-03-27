export interface ResourceItem {
  title: string;
  link: string;
}

export interface Course {
  name: string;
  code: string;
  resources: {
    PYQs: { [year: string]: ResourceItem[] };
    Assignments: ResourceItem[];
    ClassNotes: ResourceItem[];
    AMNotes: ResourceItem[];
  };
  externalLinks?: ResourceItem[];
}

export type CoursesData = Record<string, Course>;
