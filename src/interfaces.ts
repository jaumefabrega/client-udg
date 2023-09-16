export interface AbpEvaluation {
  id: number;
  textEval1: string;
  textEval2: string;
  textEval3: string;
  studentResponse: string;
  studentId: number;
  abpId: number;
  teacherId?: number;
  teacherName?: string;
}

export type TextEvaluationOrder = 1 | 2 | 3;

interface AbpEvaluationFields {
  id: number;
  asistencia: number | null;
  interes: number | null;
  informacion: number | null;
  interaccion: number | null;
  estudio: number | null;
  fuentes: number | null;
  analisis: number | null;
  notaFinal: number | null;
  chatTeacher1: string;
  chatStudent1: string;
  chatTeacher2: string;
}

export interface AbpEvaluationExtended extends AbpEvaluationFields {
  student: Student;
  courseId: number;
  courseName: string;
  courseOrder: number;
  abpId: number;
  abpOrder: number;
}

export interface AbpEvaluationComplete extends AbpEvaluationFields {
  abp: {
    id: number;
    order: 0;
    courseId: number;
    course: {
      id: number;
      name: string;
      weeksDuration: number;
      order: number;
    };
    teachers: Teacher[];
  };
}
export interface AllEvaluationsAbpFromHttp {
  course: { id: number; order: number; name: string; weeksDuration: number };
  abp: {
    id: number;
    order: number;
    teachers: Teacher[];
    abpEvaluations: AbpEvaluationExtended[];
  };
}

export interface AllEvaluationsAbpParsed {
  abpInfo: {
    id: number;
    order: number;
    teachers: Teacher[];
    course: { id: number; order: number; name: string; weeksDuration: number };
  };
  evaluations: AbpEvaluationExtended[];
}

export interface AllEvaluationsStudentFromHttp {
  abpEvaluations: AbpEvaluationComplete[];
  student: Student;
}

export interface AllEvaluationsStudentParsed {
  evaluations: AbpEvaluationExtended[];
  abpInfo: undefined;
}
export interface Teacher {
  id: number;
  name: string;
  email: string;
}
export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface CourseInfoAbp {
  id: number;
  order: number;
  teachers: Teacher[];
}
export interface CourseInfo {
  id: number;
  name: string;
  order: number;
  abps: CourseInfoAbp[];
}
export interface AbpInfo {
  id: number;
  order: number;
  teachers: Teacher[];
  course: {
    id: number;
    name: string;
    order: number;
    weeksDuration: number;
  };
}

export interface CourseScore {
  id: number;
  score1: number;
  score2: number;
  score3: number;
  studentId: number;
  courseId: number;
}

export interface CourseI {
  id: number;
  name: string;
  weeksDuration: number;
  order: number;
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
