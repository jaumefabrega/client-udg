import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/context";
import { AbpEvaluation, Student } from "@/interfaces";
import { Card, Text, Badge, Button, Group, Textarea } from "@mantine/core";

import styles from "./abpCard.module.scss";
import { Book, ListCheck, Speakerphone, UserCircle } from "tabler-icons-react";
import EditButtons from "../EditButtons/EditButtons";
import { evaluations } from "@/constants";

interface Props {
  abpEvaluation: AbpEvaluation;
  order: number;
  handlePostAbp: (abpEval: AbpEvaluation) => void;
  student?: Student;
}

const AbpCard: React.FC<Props> = ({
  abpEvaluation,
  order,
  student,
  handlePostAbp,
}) => {
  const { user } = useContext(UserContext);
  const PENDING_VALUATION = "-Pendiente de evaluación-";
  const NO_STUDENT_RESPONSE = "-No hay respuesta del alumno-";

  const [editableAbp, setEditableAbp] = useState(abpEvaluation);

  const [isEditing, setIsEditing] = useState(false);

  const ALL_EVALS_ARE_PENDING =
    !abpEvaluation.textEval1 &&
    !abpEvaluation.textEval2 &&
    !abpEvaluation.textEval3;

  const handleChange = (field: string, value: string) => {
    setEditableAbp((p) => ({ ...p, [field]: value }));
  };

  const discardEdit = () => {
    setEditableAbp(abpEvaluation);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setIsEditing(false);
    handlePostAbp(editableAbp); // FIX: todo: this should await, try, catch error
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.container}
    >
      <div className={styles.abpHeader}>
        <div>
          <h3 className={styles.title}>ABP semana {order}:</h3>
          <Text className={styles.teacher}>
            Prof: {abpEvaluation.teacherName}
          </Text>
        </div>
        {user?.id === abpEvaluation.teacherId && (
          <EditButtons
            setIsEditing={setIsEditing}
            discardEdit={discardEdit}
            saveEdit={saveEdit}
            isEditing={isEditing}
            neverFilled={ALL_EVALS_ARE_PENDING}
          />
        )}
      </div>
      <div className={styles.evaluationWrapper}>
        <ListCheck />
        <div className={styles.evaluation}>
          <Text>{evaluations[0].name}</Text>
          <Textarea
            placeholder={PENDING_VALUATION}
            autosize
            minRows={2}
            value={editableAbp.textEval1 || ""}
            onChange={(event) =>
              handleChange("textEval1", event?.target?.value)
            }
            disabled={!isEditing || user?.type === "student"}
            classNames={{ input: styles.textareaInput }}
          />
        </div>
      </div>
      <div className={styles.evaluationWrapper}>
        <Speakerphone />
        <div className={styles.evaluation}>
          <Text>{evaluations[1].name}</Text>
          <Textarea
            placeholder={PENDING_VALUATION}
            autosize
            minRows={2}
            value={editableAbp.textEval2 || ""}
            onChange={(event) =>
              handleChange("textEval2", event?.target?.value)
            }
            disabled={!isEditing || user?.type === "student"}
            classNames={{ input: styles.textareaInput }}
          />
        </div>
      </div>
      <div className={styles.evaluationWrapper}>
        <Book />
        <div className={styles.evaluation}>
          <Text>{evaluations[2].name}</Text>
          <Textarea
            placeholder={PENDING_VALUATION}
            autosize
            minRows={2}
            value={editableAbp.textEval3 || ""}
            onChange={(event) =>
              handleChange("textEval3", event?.target?.value)
            }
            disabled={!isEditing || user?.type === "student"}
            classNames={{ input: styles.textareaInput }}
          />
        </div>
      </div>

      {!ALL_EVALS_ARE_PENDING && (
        <div className={styles.reply}>
          <div className={styles.replyHeader}>
            <div className={styles.user}>
              <UserCircle />
              <h5>Respuesta de {student?.name}</h5>
            </div>
            {user?.type === "student" && (
              <EditButtons
                setIsEditing={setIsEditing}
                discardEdit={discardEdit}
                saveEdit={saveEdit}
                isEditing={isEditing}
                neverFilled={!abpEvaluation.studentResponse}
              />
            )}
          </div>
          <Text className={styles.replyText}>
            <Textarea
              placeholder={NO_STUDENT_RESPONSE}
              autosize
              minRows={2}
              value={editableAbp.studentResponse || ""}
              onChange={(event) =>
                handleChange("studentResponse", event?.target?.value)
              }
              disabled={!isEditing || user?.type === "teacher"}
              classNames={{ input: styles.textareaInput }}
            />
          </Text>
        </div>
      )}
    </Card>
  );
};

export default AbpCard;
