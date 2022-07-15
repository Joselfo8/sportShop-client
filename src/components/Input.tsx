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
      <input {...field} type={type} className={`${styles["input"]} primary`} />
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
