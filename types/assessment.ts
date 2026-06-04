export type AssessmentQuestion = {
    id: string;
    text: string;
    type: string;
    options: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    assessmentId: string;
    createdAt: string;
    updatedAt: string;
  };

export type Assessment = {
    id: string,
    courseId: string | null,
    moduleId: string | null,
    title: string,
    passingScore: number,
    timeLimit: number,
    createdAt: string,
    updatedAt: string,
    questions: AssessmentQuestion[]
};
