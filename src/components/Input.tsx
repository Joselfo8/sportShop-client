import { useController, UseControllerProps } from "react-hook-form";
// Styles
import styles from "./Input.module.css";

interface Props {
  label: string;
  type?: string;
}

function Input({ label, type, ...props }: UseControllerProps & Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <label className={`${styles["label"]}`}>
      <span className={styles["title"]}>{label}</span>
      <input
        {...{ ...field, value: field.value ? field.value : "" }}
        type={type}
        className={styles["input"]}
      />
      <span
        className={`${styles["description"]} ${
          error ? styles["error-message"] : ""
        }`}
      >
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message ? error?.message : ""}
      </span>
    </label>
  );
}

export default Input;
