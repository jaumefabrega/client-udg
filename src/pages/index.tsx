import type { NextPage } from "next/types";

import Head from "next/head";
import { useContext } from "react";
import { useQuery } from "react-query";

import { UserContext } from "@/context";

import api from "@/services/api";
import { CourseI } from "@/interfaces";
import CourseCard from "@/modules/courses/CourseCard/CourseCard";

import styles from "@/styles/courses.module.scss";

export const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery<CourseI[], Error>("getCourses", () => api.getCourses(), {
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>ERROR...</div>;

  return (
    <>
      <h3>ASIGNATURAS</h3>
      {!!courses.length ? (
        <div className={styles.coursesList}>
          {courses
            .sort((a, b) => a.name.localeCompare(b.name))
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
