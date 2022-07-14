import { useEffect, useRef } from "react";
import styles from "./Checkbox.module.css";

interface Props {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void | null;
  value: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
}

function Checkbox({
  onChange,
  value,
  id,
  name,
  disabled,
  indeterminate = false,
  checked,
}: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Toggle indeterminate property
  useEffect(() => {
    if (checkboxRef.current !== null)
      checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={`${styles["checkbox-cont"]} primary`}>
      <input
        onChange={onChange}
        ref={checkboxRef}
        className={styles["checkbox"]}
        value={value}
        type="checkbox"
        id={id}
        name={name}
        disabled={disabled}
        {...(checked !== undefined ? { checked } : {})}
      />
    </div>
  );
}

export default Checkbox;
