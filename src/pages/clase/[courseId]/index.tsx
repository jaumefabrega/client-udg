import { useRouter } from "next/router";
import { useContext } from "react";
import { useQuery } from "react-query";

import api from "@/services/api";

import { UserContext } from "@/context";
import { CourseI, CourseInfo } from "@/interfaces";
import AbpCard from "@/modules/courses/abps/AbpCard/AbpCard";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import styles from "@/styles/weeks.module.scss";

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
  } = useQuery<CourseInfo, Error>(
    ["getCourseInfo", courseId],
    () => api.getCourseInfo(courseId || ""),
    {
      retry: false,
    }
  );

  if (isLoading) return <div />;
  if (isError) return <div>Ha habido un error.</div>;

  // if (!course) return null;
  return (
    <>
      <h3>{course?.name}</h3>
      {course &&
        (!!course.abps?.length ? (
          <div className={styles.weeksList}>
            {course.abps.map((abp) => (
              <AbpCard key={abp.id} abp={abp} />
            ))}
          </div>
        ) : (
          <Text>No hay alumnos matriculados</Text>
        ))}
    </>
  );
};

export default Courses;
