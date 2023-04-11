import { AbpEvaluation, CourseScore } from "@/interfaces";
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

async function postEvaluation(evaluation: AbpEvaluation) {
  console.log("posting", evaluation);
  const res = await apiClient.post("/evaluation", evaluation);
  return res.data;
}

async function postCourseScore(score: CourseScore) {
  const res = await apiClient.post("/course-score", score);
  return res.data;
}

const api = {
  getCourses,
  getEvaluations,
  getStudents,
  postCourseScore,
  postEvaluation,
};

export default api;
