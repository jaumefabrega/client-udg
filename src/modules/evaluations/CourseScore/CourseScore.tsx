import { useContext, useState } from "react";

import { UserContext } from "@/context";
import { AbpEvaluation, CourseScore } from "@/interfaces";
import { Card, Text, Badge, Button, Group, NumberInput } from "@mantine/core";

import styles from "./courseScore.module.scss";
import { Book, ListCheck, Speakerphone } from "tabler-icons-react";
import EditButtons from "../EditButtons/EditButtons";

interface Props {
  score: CourseScore; // FIX: remove "?"
  handlePostScore: (score: CourseScore) => void;
}

const CourseScore: React.FC<Props> = ({ score, handlePostScore }) => {
  const { user } = useContext(UserContext);

  const [editableScore, setEditableScore] = useState(score);

  const [isEditing, setIsEditing] = useState(false);

  const SCORE_NEVER_FILLED =
    editableScore?.score1 === null &&
    editableScore?.score2 === null &&
    editableScore?.score3 === null;
  const finalScore = SCORE_NEVER_FILLED
    ? "-"
    : (
        (Number(editableScore?.score1) +
          Number(editableScore?.score2) +
          Number(editableScore?.score3)) /
        3
      ).toFixed(2);

  const handleChange = (field: string, value: number | "") => {
    setEditableScore((p) => ({ ...p, [field]: value }));
  };

  const discardEdit = () => {
    setEditableScore(score);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setIsEditing(false);
    handlePostScore(editableScore); // FIX: todo: this should await, try, catch error
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.container}
    >
      <div className={styles.left}>
        <h3 className={styles.title}>Nota final:</h3>
        <div className={styles.score}>
          <div className={styles.adders}>
            <div className={styles.subScore}>
              <ListCheck />
              <NumberInput
                placeholder="-"
                value={editableScore.score1 || ""}
                onChange={(newValue) => handleChange("score1", newValue)}
                hideControls
                disabled={!isEditing}
                classNames={{ input: styles.input }}
              />
            </div>
            <div className={styles.subScore}>
              <Speakerphone />
              <NumberInput
                placeholder="-"
                value={editableScore.score2 || ""}
                onChange={(newValue) => handleChange("score2", newValue)}
                hideControls
                disabled={!isEditing}
                classNames={{ input: styles.input }}
              />
            </div>
            <div className={styles.subScore}>
              <Book />
              <NumberInput
                placeholder="-"
                value={editableScore.score3 || ""}
                onChange={(newValue) => handleChange("score3", newValue)}
                hideControls
                disabled={!isEditing}
                classNames={{ input: styles.input }}
              />
            </div>
          </div>
          <div className={styles.result}>{finalScore}</div>
        </div>
      </div>
      {user?.type === "teacher" && (
        <EditButtons
          setIsEditing={setIsEditing}
          discardEdit={discardEdit}
          saveEdit={saveEdit}
          isEditing={isEditing}
          neverFilled={SCORE_NEVER_FILLED}
        />
      )}
      <Text className={styles.note}>
        La nota final es la media de las 3 competencias, evaluadas al final de
        la asignatura entre todos los profesores de la misma.
      </Text>
    </Card>
  );
};

export default CourseScore;
