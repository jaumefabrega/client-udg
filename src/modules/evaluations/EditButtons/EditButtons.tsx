import cn from "classnames";
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
          classNames={{ root: cn(styles.editButton, styles.button) }}
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
            classNames={{ root: cn(styles.cancelButton, styles.button) }}
          >
            Cancelar
          </Button>
          <Button
            onClick={saveEdit}
            disabled={disable}
            variant="filled"
            size="xs"
            classNames={{ root: cn(styles.saveButton, styles.button) }}
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
