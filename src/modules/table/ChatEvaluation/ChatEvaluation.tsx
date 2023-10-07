import { AbpEvaluationExtended } from "@/interfaces";
import styles from "./chatEvaluation.module.scss";
import { Modal, Text, Textarea } from "@mantine/core";
import { BrandMessenger as ChatIcon } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import EditButtons from "@/modules/evaluations/EditButtons/EditButtons";
import { useContext, useState } from "react";
import { UserContext } from "@/context";
import api from "@/services/api";

interface Props {
  abpEvaluation: AbpEvaluationExtended;
  setEvaluations: React.Dispatch<React.SetStateAction<AbpEvaluationExtended[]>>;
  isTeacherOfThisAbp: boolean;
}

export const ChatEvaluation: React.FC<Props> = ({
  abpEvaluation,
  setEvaluations,
  isTeacherOfThisAbp,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [chatTeacher1, setChatTeacher1] = useState(abpEvaluation.chatTeacher1);
  const [chatStudent1, setChatStudent1] = useState(abpEvaluation.chatStudent1);
  const [chatTeacher2, setChatTeacher2] = useState(abpEvaluation.chatTeacher2);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof AbpEvaluationExtended, newValue: string) => {
    setEvaluations((prev) => {
      const currIdx = prev.findIndex((ev) => ev.id === abpEvaluation.id);
      return Object.assign([], prev, {
        [currIdx]: { ...prev[currIdx], [key]: newValue },
      });
    });
  };

  const resetChats = () => {
    setChatTeacher1(abpEvaluation.chatTeacher1);
    setChatStudent1(abpEvaluation.chatStudent1);
    setChatTeacher2(abpEvaluation.chatTeacher2);
  };

  const handleClose = () => {
    resetChats();
    close();
  };

  const handleSave = () => {
    const saveChats = async () => {
      setIsSaving(true);
      await api.postTextEvaluations(
        abpEvaluation.id,
        chatTeacher1,
        chatStudent1,
        chatTeacher2
      );
      handleChange("chatTeacher1", chatTeacher1);
      handleChange("chatStudent1", chatStudent1);
      handleChange("chatTeacher2", chatTeacher2);
      setIsSaving(false);
      close();
    };

    saveChats();
  };

  const { user } = useContext(UserContext);
  const isTeacher = user?.type === "teacher";
  const isStudent = user?.type === "student";

  const showCommentTeacher1 =
    isTeacherOfThisAbp || !!abpEvaluation.chatTeacher1;
  const showCommentStudent1 =
    (isStudent && !!abpEvaluation.chatTeacher1) || !!abpEvaluation.chatStudent1;
  const showCommentTeacher2 =
    (isTeacherOfThisAbp && !!abpEvaluation.chatStudent1) ||
    !!abpEvaluation.chatTeacher2;

  const disableCommentTeacher1 =
    !isTeacherOfThisAbp || !!abpEvaluation.chatStudent1;
  const disableCommentStudent1 = isTeacher || !!abpEvaluation.chatTeacher2;
  const disableCommentTeacher2 = !isTeacherOfThisAbp;
  const allAreDisabled =
    disableCommentTeacher1 && disableCommentStudent1 && disableCommentTeacher2;

  if (isStudent && !abpEvaluation.chatTeacher1) return null;

  return (
    <>
      <div className={styles.container}>
        <ChatIcon onClick={open} color="gray" />
      </div>
      {opened && (
        <Modal
          opened={opened}
          onClose={handleClose}
          title={abpEvaluation.student.name}
          centered
        >
          <div className={styles.modalContent}>
            {showCommentTeacher1 && (
              <div className={styles.textareaWrapper}>
                <Text>Comentario para el alumno:</Text>
                <Textarea
                  placeholder="Escribe aquí"
                  autosize
                  minRows={2}
                  maxLength={1000}
                  classNames={{ input: styles.textareaInput }}
                  disabled={disableCommentTeacher1}
                  value={chatTeacher1 || ""}
                  onChange={(event) =>
                    setChatTeacher1(event.currentTarget.value)
                  }
                />
              </div>
            )}
            {showCommentStudent1 && (
              <div className={styles.textareaWrapper}>
                <Text>Réplica del alumno:</Text>
                <Textarea
                  placeholder="Escribe aquí"
                  autosize
                  minRows={2}
                  maxLength={1000}
                  classNames={{ input: styles.textareaInput }}
                  disabled={disableCommentStudent1}
                  value={chatStudent1 || ""}
                  onChange={(event) =>
                    setChatStudent1(event.currentTarget.value)
                  }
                />
              </div>
            )}
            {showCommentTeacher2 && (
              <div className={styles.textareaWrapper}>
                <Text>Réplica del profesor:</Text>
                <Textarea
                  placeholder="Escribe aquí"
                  autosize
                  minRows={2}
                  maxLength={1000}
                  classNames={{ input: styles.textareaInput }}
                  disabled={disableCommentTeacher2}
                  value={chatTeacher2 || ""}
                  onChange={(event) =>
                    setChatTeacher2(event.currentTarget.value)
                  }
                />
              </div>
            )}
            {!allAreDisabled && (
              <EditButtons
                setIsEditing={close}
                isEditing={opened}
                discardEdit={handleClose}
                saveEdit={handleSave}
                disable={isSaving}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
