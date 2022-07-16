import { useForm } from "react-hook-form";
// Components
import Input from "../Input";
// Styles
import styles from "./AddressEditor.module.css";

interface Props {
  data: {
    name: string;
    lastname: string;
    email: string;
    dateOfBirth: string;
    genre: string;
  };
  saveChange: (data: Props["data"]) => void;
  onClose: () => void;
}

function InfoEditor({ data, saveChange, onClose }: Props) {
  const { handleSubmit, control } = useForm<any>({
    defaultValues: data,
    mode: "onChange",
  });

  // send data to api
  const onSubmit = (data: Props["data"]) => {
    saveChange(data);
    onClose();
  };

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["wrapper"]}>
          <Input control={control} name="name" label="Name" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="lastname" label="Last name" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="email" label="Email" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="dateOfBirth" label="Birthdate" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="genre" label="Genre" />
        </div>
        <div className={styles["button-cont"]}>
          <button className={`${styles["submit-button"]} primary`}>
            Save changes
          </button>

          <span
            onClick={() => onClose()}
            className={`${styles["cancel-button"]} primary`}
          >
            Cancel
          </span>
        </div>
      </form>
    </div>
  );
}

export default InfoEditor;
