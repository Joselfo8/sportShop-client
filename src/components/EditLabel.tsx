import EdiText from "react-editext";
// Icons
import { ReactComponent as SuccessIcon } from "../icons/success-icon.svg";
import { ReactComponent as ErrorIcon } from "../icons/error-icon.svg";
import { ReactComponent as EditIcon } from "../icons/edit-pen-icon.svg";
// Styles
import styles from "./EditLabel.module.css";

interface Props {
  type?: any;
  id: string;
  label: string;
  edit: boolean;
  value: string;
  onSave: (prev: string) => void;
}

function EditLabel({ type = "text", id, label = "", edit = false, value = "", onSave }: Props) {
  return (
    <div className={styles["container"]}>
      <label htmlFor={id}>{label}:</label>
      <EdiText
        type={type}
        value={value}
        onSave={onSave}
        editContainerClassName={`${styles["edit-mode"]} secondary`}
        saveButtonContent={<SuccessIcon />}
        saveButtonClassName={`${styles["button"]} primary`}
        cancelButtonContent={<ErrorIcon />}
        cancelButtonClassName={`${styles["button"]} primary`}
        editButtonContent={<EditIcon />}
        editButtonClassName={edit ? `${styles["button"]} primary` : styles["hidden"]}
      />
    </div>
  );
}

export default EditLabel;
