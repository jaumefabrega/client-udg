export interface AbpEvaluation {
  id: number;
  textEval1: string;
  textEval2: string;
  textEval3: string;
  studentResponse: string;
  studentId: number;
  abpId: number;
  teacherId?: number;
}

export interface CourseScore {
  id: number;
  score1: number;
  score2: number;
  score3: number;
  studentId: number;
  courseId: number;
}

export interface Student {
  id: number;
  email: string;
  name: string;
}

export interface CourseI {
  id: number;
  name: string;
  weeksDuration: number;
  students?: Student[];
  abpEvaluations?: AbpEvaluation[];
  courseScore?: CourseScore;
  student?: Student;
}

export interface User {
  name: string;
  email: string;
  token: string;
  id: number;
  type: "teacher" | "student";
}
