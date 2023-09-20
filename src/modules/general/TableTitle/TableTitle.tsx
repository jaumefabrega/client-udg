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
  const explanationLink = (
    <a
      href="https://drive.google.com/file/d/1y6Wy2aULcFGlFkl_W7_pvZBP7I4mjK4e/view"
      target="_blank"
      className={styles.explanationLink}
    >
      <div>RÚBRICA DE EVALUACIÓN</div>
      <img src="/icons/openInNew.svg" className={styles.openInNew} />
    </a>
  );

  if (!isTeacher)
    return (
      <div>
        <h1 className={styles.mainTitle}>{user?.name}</h1>
        {explanationLink}
      </div>
    );
  return (
    <div>
      <h1 className={styles.mainTitle}>{abpInfo?.course.name}</h1>
      <h2 className={styles.weekNumber}>ABP {Number(abpInfo?.order) + 1}</h2>
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
      {canEditEvaluations ? (
        <>
          <div>
            <em>
              Pulsa el botón EDITAR de debajo de la tabla para iniciar la
              evaluación. No te olvides de GUARDAR los cambios realizados.
            </em>
          </div>
          <div>
            <em>Puedes añadir texto libre en la última columna.</em>
          </div>
        </>
      ) : (
        <em>No puedes editar las notas porque no eres profesor de este ABP.</em>
      )}
      {explanationLink}
    </div>
  );
};
