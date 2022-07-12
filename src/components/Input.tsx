import { useState, useEffect } from "react";
import styles from "./Input.module.css";

interface Props {
  text: string;
  type?: string;
  id: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  getData: Function;
}

function Input({
  text,
  type = "text",
  id,
  placeholder,
  defaultValue = "",
  required,
  getData,
}: Props) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState({ code: 0, message: "" });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const mergeStatus = (newStatus: object) =>
      setStatus((prev) => ({ ...prev, ...newStatus }));
    const newValue = e.currentTarget.value;

    getData(newValue, mergeStatus);
    setValue(newValue);
  };

  // set default value
  useEffect(() => {
    if (defaultValue.length > 0) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <label className={`${styles["label"]}`} htmlFor={id}>
      <span className={styles["title"]}>{text}</span>

      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        id={id}
        className={`${styles["input"]} primary`}
        required={required}
      />

      <span
        className={`${styles["description"]} ${
          status.message.length > 0 && status.code === 1 ? "success" : ""
        } ${status.message.length > 0 && status.code === 2 ? "danger" : ""}`}
      >
        {status.code > 0 && status.message.length > 0 && status.message}
      </span>
    </label>
  );
}

export default Input;
