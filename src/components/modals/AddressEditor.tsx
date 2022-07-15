import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// Components
import Input from "../Input";
// Styles
import styles from "./AddressEditor.module.css";

interface Props {
  data: {
    name: string;
    address: string;
    secondAddress?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  saveChange: (data: Props["data"]) => void;
  onClose: () => void;
}

function AddressEditor({ data, saveChange, onClose }: Props) {
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
          <Input control={control} name="address" label="Address Line" />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="secondAddress"
            label="Address Line 2"
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="city" label="City" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="state" label="State" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="zipCode" label="Zip code" />
        </div>
        <div className={styles["wrapper"]}>
          <Input control={control} name="phone" label="Phone" />
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

export default AddressEditor;
