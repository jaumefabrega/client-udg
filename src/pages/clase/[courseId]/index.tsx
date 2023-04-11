import { useRouter } from "next/router";
import { useContext } from "react";
import { useQuery } from "react-query";

import api from "@/services/api";

import { UserContext } from "@/context";
import { CourseI } from "@/interfaces";
import StudentCard from "@/modules/courses/students/StudentCard/StudentCard";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import styles from "@/styles/students.module.scss";

export const Courses = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const courseId = Array.isArray(router.query.courseId)
    ? router.query.courseId[0]
    : router.query.courseId;

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery<CourseI, Error>(
    "getStudents",
    () => api.getStudents(courseId || ""),
    {
      retry: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>ERROR...</div>;

  // if (!course) return null;
  return (
    <>
      <h3>ALUMNOS de {course?.name}</h3>
      {course &&
        (!!course.students?.length ? (
          <div className={styles.studentsList}>
            {course.students
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
          </div>
        ) : (
          <Text>No hay alumnos matriculados</Text>
        ))}
    </>
  );
};

export default Courses;
