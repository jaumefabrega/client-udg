import { useContext } from "react";
import cn from "classnames";
import { UserContext } from "@/context";
import { AbpEvaluation, CourseInfoAbp, Student } from "@/interfaces";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import styles from "./abpCard.module.scss";
import { useRouter } from "next/router";
import { CalendarEvent, ChevronRight, User } from "tabler-icons-react";

interface Props {
  abp: CourseInfoAbp;
}

const AbpCard: React.FC<Props> = ({ abp }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <a href={`${router.asPath}/${abp.id}`}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.container}
      >
        <div className={styles.leftInfo}>
          <CalendarEvent className={styles.calendarIcon} />
          <div>
            <Text className={styles.weekNumber}>Semana {abp.order + 1}</Text>
            <Text>
              {abp.teachers.map((teacher) => (
                <div
                  className={cn({
                    [styles.isLoggedTeacher]: teacher.id === user?.id,
                  })}
                  key={teacher.id}
                >
                  {teacher.name}
                </div>
              ))}
            </Text>
          </div>
        </div>
        <div className={styles.rightInfo}>
          <ChevronRight className={styles.chevron} />
        </div>
      </Card>
    </a>
  );
};

export default AbpCard;
