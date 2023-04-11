import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import api from "@/services/api";

import { UserContext } from "@/context";
import { AbpEvaluation, CourseI, CourseScore } from "@/interfaces";
import AbpCard from "@/modules/evaluations/AbpCard/AbpCard";

import styles from "@/styles/evaluations.module.scss";
import CourseScoreCard from "@/modules/evaluations/CourseScore/CourseScore";

export const Course = () => {
  const router = useRouter();
  const courseId = Array.isArray(router.query.courseId)
    ? router.query.courseId[0]
    : router.query.courseId;

  const studentId = Array.isArray(router.query.studentId)
    ? router.query.studentId[0]
    : router.query.studentId;

  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery<CourseI, Error>(
    "getEvaluations",
    () => api.getEvaluations(courseId || "", studentId || ""),
    {
      retry: false,
    }
  );

  const evaluationMutation = useMutation(api.postEvaluation, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("getEvaluations");
    },
  });

  const scoreMutation = useMutation(api.postCourseScore, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("getEvaluations");
    },
  });

  // FIX: TODO: reuse from CourseCard.tsx
  const getCourseLink = (id: number) => {
    const basePath = `/clase/${id}`;
    return user?.type === "teacher" ? basePath : `${basePath}/${user?.id}`;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>ERROR...</div>;
  if (!course?.abpEvaluations?.length) return null;

  return (
    <>
      <a href={getCourseLink(course.id)}>
        <h3 className={styles.courseName}>{course?.name}</h3>
      </a>
      {user?.type === "teacher" && <h4>{course?.student?.name}</h4>}
      <div className={styles.list}>
        {course.abpEvaluations
          .sort((a, b) => a.id - b.id)
          .map((evaluation, i) => (
            <AbpCard
              key={evaluation.id}
              abpEvaluation={evaluation}
              order={i + 1}
              student={course?.student}
              handlePostAbp={(abpEval: AbpEvaluation) =>
                evaluationMutation.mutate(abpEval)
              }
            />
          ))}
      </div>
      <CourseScoreCard
        score={course.courseScore}
        handlePostScore={(score: CourseScore) => scoreMutation.mutate(score)}
      />
    </>
  );
};

export default Course;
