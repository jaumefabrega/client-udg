import { Button } from "@mantine/core";

import styles from "./editButtons.module.scss";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  discardEdit: () => void;
  saveEdit: () => void;
  isEditing: boolean;
  neverFilled: boolean;
}

const EditButtons: React.FC<Props> = ({
  setIsEditing,
  discardEdit,
  saveEdit,
  isEditing,
  neverFilled,
}) => {
  return (
    <>
      {!isEditing ? (
        <Button
          onClick={() => {
            setIsEditing(true);
          }}
          variant="light"
          size="xs"
        >
          {neverFilled ? "Rellenar" : "Editar"}
        </Button>
      ) : (
        <div className={styles.editButtons}>
          <Button onClick={discardEdit} variant="light" size="xs" color="red">
            Cancelar
          </Button>
          <Button
            onClick={saveEdit}
            variant="filled"
            size="xs"
            className={styles.saveButton}
            color="green"
          >
            Publicar
          </Button>
        </div>
      )}
    </>
  );
};

export default EditButtons;
