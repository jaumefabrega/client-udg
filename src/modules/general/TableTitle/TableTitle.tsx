import { useContext } from "react";
import cn from "classnames";
import { UserContext } from "@/context";
import { AbpInfo } from "@/interfaces";

import styles from "./tableTitle.module.scss";

interface Props {
  canEditEvaluations: boolean;
  abpInfo?: AbpInfo;
}

export const TableTitle: React.FC<Props> = ({
  abpInfo,
  canEditEvaluations,
}) => {
  const { user } = useContext(UserContext);
  const isTeacher = user?.type === "teacher";
  const hasMultipleTeachers = Number(abpInfo?.teachers?.length) > 1;

  if (!isTeacher)
    return (
      <div>
        <h1 className={styles.mainTitle}>{user?.name}</h1>
      </div>
    );
  return (
    <div>
      <h1 className={styles.mainTitle}>{abpInfo?.course.name}</h1>
      <h2 className={styles.weekNumber}>Semana {Number(abpInfo?.order) + 1}</h2>
      <div className={styles.teachersNames}>
        Profesor{hasMultipleTeachers ? "es" : ""}:{" "}
        {abpInfo?.teachers?.map((t, idx) => (
          <span
            className={cn({ [styles.isLoggedTeacher]: t.id === user.id })}
            key={t.id}
          >
            {t.name}
            {idx === abpInfo?.teachers?.length - 1 ? "." : ", "}
          </span>
        ))}
      </div>
      <em>
        {canEditEvaluations
          ? 'Para editar las notas, pulsa el botón "Editar" de debajo de la tabla.'
          : "No puedes editar las notas porque no eres profesor de este ABP."}
      </em>
    </div>
  );
};
