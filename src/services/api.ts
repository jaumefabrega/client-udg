import { FAKE_ABP_EVALUATIONS, FAKE_COURSE_INFO } from "@/constants";
import {
  AbpEvaluation,
  AbpEvaluationExtended,
  AllEvaluationsAbpParsed,
  AllEvaluationsAbpFromHttp,
  CourseScore,
  TextEvaluationOrder,
  AllEvaluationsStudentFromHttp,
  AllEvaluationsStudentParsed,
} from "@/interfaces";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function getCourses() {
  const res = await apiClient.get("/courses");
  return res.data;
}

async function getCourseInfo(courseId: string) {
  const res = await apiClient.get("/course-info", {
    params: { courseId },
  });
  return res.data;
}

async function getStudents(courseId: string) {
  const res = await apiClient.get("/students", {
    params: { courseId },
  });
  return res.data;
}

async function getEvaluations(courseId: string, studentId: string) {
  const res = await apiClient.get("/evaluations", {
    params: { courseId, studentId },
  });
  return res.data;
}

const parseAllEvaluationsAbp = (response: AllEvaluationsAbpFromHttp) => {
  const abpInfo = {
    id: response.abp.id,
    order: response.abp.order,
    teachers: response.abp.teachers,
    course: response.course,
  };

  const evaluations = response.abp.abpEvaluations.map((ev) => ({
    ...ev,
    courseId: response.course.id,
    courseName: response.course.name,
    courseOrder: response.course.order,
    abpId: response.abp.id,
    abpOrder: response.abp.order,
  }));

  return { abpInfo, evaluations };
};

async function getAllEvaluationsAbp(
  courseId: string,
  abpId: string
): Promise<AllEvaluationsAbpParsed> {
  const res = await apiClient.get("/all-evaluations-abp", {
    params: { courseId, abpId },
  });
  return parseAllEvaluationsAbp(res.data);
}

const parseAllEvaluationsStudent = (
  response: AllEvaluationsStudentFromHttp
) => {
  const evaluations = response.abpEvaluations.map((ev) => ({
    id: ev.id,
    asistencia: ev.asistencia,
    interes: ev.interes,
    informacion: ev.informacion,
    interaccion: ev.interaccion,
    estudio: ev.estudio,
    fuentes: ev.fuentes,
    analisis: ev.analisis,
    notaFinal: ev.notaFinal,
    chatTeacher1: ev.chatTeacher1,
    chatStudent1: ev.chatStudent1,
    chatTeacher2: ev.chatTeacher2,
    courseId: ev.abp.course.id,
    courseName: ev.abp.course.name,
    courseOrder: ev.abp.course.order,
    abpId: ev.abp.id,
    abpOrder: ev.abp.order,
    student: response.student,
  }));

  return { abpInfo: undefined, evaluations };
};

async function getAllEvaluationsStudent(): Promise<AllEvaluationsStudentParsed> {
  const res = await apiClient.get("/all-evaluations-student", {});
  return parseAllEvaluationsStudent(res.data);
}

async function postAllEvaluations(evaluations: AbpEvaluationExtended[]) {
  const res = await apiClient.post("/evaluations-all", evaluations);
  return res.data;
}

async function postTextEvaluations(
  id: number,
  chatTeacher1: string,
  chatStudent1: string,
  chatTeacher2: string
) {
  const res = await apiClient.post("/evaluation-chats", {
    id,
    chatTeacher1,
    chatStudent1,
    chatTeacher2,
  });
  return res.data;
}

async function postEvaluation(evaluation: AbpEvaluation) {
  const res = await apiClient.post("/evaluation", evaluation);
  return res.data;
}

async function postCourseScore(score: CourseScore) {
  const res = await apiClient.post("/course-score", score);
  return res.data;
}

const api = {
  getCourses,
  getCourseInfo,
  getEvaluations,
  getAllEvaluationsAbp,
  getAllEvaluationsStudent,
  postAllEvaluations,
  postTextEvaluations,
  getStudents,
  postCourseScore,
  postEvaluation,
};

export default api;
