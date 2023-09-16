import { Button } from "@mantine/core";

import styles from "./editButtons.module.scss";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  discardEdit: () => void;
  saveEdit: () => void;
  isEditing: boolean;
  disable: boolean;
}

const EditButtons: React.FC<Props> = ({
  setIsEditing,
  discardEdit,
  saveEdit,
  isEditing,
  disable,
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
          Editar
        </Button>
      ) : (
        <div className={styles.editButtons}>
          <Button
            onClick={discardEdit}
            disabled={disable}
            variant="light"
            size="xs"
            color="red"
          >
            Cancelar
          </Button>
          <Button
            onClick={saveEdit}
            disabled={disable}
            variant="filled"
            size="xs"
            className={styles.saveButton}
            color="green"
          >
            Guardar
          </Button>
        </div>
      )}
    </>
  );
};

export default EditButtons;
