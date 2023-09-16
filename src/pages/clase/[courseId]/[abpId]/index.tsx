import { useContext, useEffect, useState } from "react";

import { NextPage } from "next/types";
import styles from "@/styles/taula.module.scss";
import { Row } from "@/modules/table/Row/Row";
import { Header } from "@/modules/table/Header/Header";
import { AbpEvaluationExtended, AbpInfo } from "@/interfaces";
import EditButtons from "@/modules/evaluations/EditButtons/EditButtons";
import api from "@/services/api";
import { UserContext } from "@/context";
import { useRouter } from "next/router";
import { TableTitle } from "@/modules/general/TableTitle/TableTitle";

interface Props {}

export const AllEvaluations: NextPage<Props> = () => {
  const router = useRouter();
  const courseId = Array.isArray(router.query.courseId)
    ? router.query.courseId[0]
    : router.query.courseId;

  const abpId = Array.isArray(router.query.abpId)
    ? router.query.abpId[0]
    : router.query.abpId;

  const [evaluations, setEvaluations] = useState<AbpEvaluationExtended[]>([]);
  const [initialEvaluations, setInitialEvaluations] = useState<
    AbpEvaluationExtended[]
  >([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [abpInfo, setAbpInfo] = useState<AbpInfo>();

  const { user } = useContext(UserContext);
  const isTeacher = user?.type === "teacher";
  const isStudent = user?.type === "student";

  const canEditEvaluations = !!abpInfo?.teachers.filter(
    (t) => t.id === user?.id
  ).length;

  const handleSave = async () => {
    setIsSaving(true);
    const response = await api.postAllEvaluations(evaluations);
    setInitialEvaluations([...response]);
    setEvaluations([...response]);
    setIsSaving(false);
    setIsEditing(false);
  };

  useEffect(() => {
    const getInitialEvals = async () => {
      let evaluations;
      let abpInfo;

      if (isStudent) {
        const response = await api.getAllEvaluationsStudent();
        evaluations = response.evaluations;
        abpInfo = response.abpInfo;
      } else if (courseId !== undefined && abpId !== undefined) {
        const response = await api.getAllEvaluationsAbp(courseId, abpId);
        evaluations = response.evaluations;
        abpInfo = response.abpInfo;
      }
      if (evaluations) {
        setInitialEvaluations([...evaluations]);
        setEvaluations([...evaluations]);
      }
      if (abpInfo) {
        setAbpInfo({ ...abpInfo });
      }
      setIsLoading(false);
    };

    getInitialEvals();
  }, [courseId, abpId, isStudent]);

  const sortedEvaluations = evaluations
    .sort((a, b) => a.abpOrder - b.abpOrder)
    .sort((a, b) => a.courseOrder - b.courseOrder)
    .sort((a, b) => a.student.name.localeCompare(b.student.name));

  if (isLoading) return <div className={styles.container} />;
  // if (isError) return <div>Ha habido un error.</div>;
  return (
    <div className={styles.container}>
      <TableTitle abpInfo={abpInfo} canEditEvaluations={canEditEvaluations} />
      <div className={styles.table}>
        <Header />
        {sortedEvaluations.map((ev, idx) => (
          <Row
            abpEvaluation={ev}
            setEvaluations={setEvaluations}
            disabled={!isEditing}
            rowIndex={idx}
            isFirstOfKind={
              sortedEvaluations.findIndex(
                (el) => el.courseId === ev.courseId
              ) === idx
            }
            key={ev.id}
          />
        ))}
      </div>
      {isTeacher && canEditEvaluations && (
        <EditButtons
          isEditing={isEditing}
          saveEdit={handleSave}
          discardEdit={() => {
            setEvaluations([...initialEvaluations]);
            setIsEditing(false);
          }}
          setIsEditing={setIsEditing}
          disable={isSaving}
        />
      )}
      {isTeacher && !canEditEvaluations && (
        <em>No puedes editar las notas porque no eres profesor de este ABP.</em>
      )}
    </div>
  );
};

export default AllEvaluations;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const { registrationUUID } = query;

//   const initialAbpEvaluations = await api.getAllEvaluations("1", "1");

//   return { props: { initialAbpEvaluations } };
// };
