import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";

import { UserContext } from "@/context";
import Login from "@/modules/general/Login/Login";
import { CourseI } from "@/interfaces";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import styles from "./courseCard.module.scss";
import { ChevronRight } from "tabler-icons-react";

interface Props {
  course: CourseI;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const { user } = useContext(UserContext);

  const getCourseLink = (id: number) => {
    const basePath = `/clase/${id}`;
    return user?.type === "teacher" ? basePath : `${basePath}/${user?.id}`;
  };

  return (
    <a href={getCourseLink(course.id)} className={styles.container}>
      <Card shadow="sm" padding="md" radius="md" className={styles.card}>
        <Text>{course.name}</Text>
        <ChevronRight className={styles.chevron} />
      </Card>
    </a>
  );
};

export default CourseCard;
