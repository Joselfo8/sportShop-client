import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-date-picker";
// Components
import Input from "../Input";
import Select from "../Select";
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
  const genreSelect = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const [genre, setGenre] = useState<{ label: string; value: string } | null>({
    label: "",
    value: "",
  });
  const [date, setDate] = useState(new Date());

  // send data to api
  const onSubmit = (data: Props["data"]) => {
    saveChange({ ...data, genre: genre?.value || data.genre });
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
          <label className={styles["label"]}>
            <span className={styles["label-title"]}>Birthdate</span>
            <DatePicker onChange={setDate} value={date} />
          </label>
        </div>
        <div className={styles["wrapper"]}>
          <label className={styles["label"]}>
            <span className={styles["label-title"]}>Genre</span>
            <Select
              options={genreSelect}
              placeholder="Select genre"
              width="10rem"
              defaultValue={
                data.genre !== null
                  ? { label: data.genre, value: data.genre }
                  : null
              }
              onChange={(data) => setGenre(data)}
            />
          </label>
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
