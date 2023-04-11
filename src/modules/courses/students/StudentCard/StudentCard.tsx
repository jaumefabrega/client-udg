import { useContext } from "react";
import Image from "next/image";

import { UserContext } from "@/context";
import { AbpEvaluation, Student } from "@/interfaces";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import styles from "./studentCard.module.scss";
import { useRouter } from "next/router";
import { ChevronRight, User } from "tabler-icons-react";

interface Props {
  student: Student;
}

const StudentCard: React.FC<Props> = ({ student }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <a href={`${router.asPath}/${student.id}`}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.container}
      >
        <div className={styles.leftInfo}>
          <User className={styles.userImage} />
          <Text>{student.name}</Text>
        </div>
        <div className={styles.rightInfo}>
          <Text>{student.email}</Text>
          <ChevronRight className={styles.chevron} />
        </div>
      </Card>
    </a>
  );
};

export default StudentCard;
