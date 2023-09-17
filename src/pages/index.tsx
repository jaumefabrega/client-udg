import type { NextPage } from "next/types";

import { useContext } from "react";
import { useQuery } from "react-query";

import { UserContext } from "@/context";

import api from "@/services/api";
import { CourseI } from "@/interfaces";
import CourseCard from "@/modules/courses/CourseCard/CourseCard";

import styles from "@/styles/courses.module.scss";
import AllEvaluations from "./clase/[courseId]/[abpId]";

export const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  const isStudent = user?.type === "student";

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery<CourseI[], Error>("getCourses", () => api.getCourses(), {
    retry: false,
    enabled: !isStudent,
  });

  if (isLoading) return <div />;
  if (isError) return <div>Ha habido un error.</div>;

  return isStudent ? (
    <AllEvaluations />
  ) : (
    <>
      <h3>ASIGNATURAS</h3>
      {!!courses.length ? (
        <div className={styles.coursesList}>
          {courses
            .sort((a, b) => a.order - b.order)
            .map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      ) : (
        <div>No courses</div>
      )}
    </>
  );
};

export default Home;
