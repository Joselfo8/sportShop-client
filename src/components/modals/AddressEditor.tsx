import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
// Components
import Input from "../Input";
// Styles
import styles from "./AddressEditor.module.css";
import "react-phone-input-2/lib/style.css";

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
  const [phone, setPhone] = useState("");
  // send data to api
  const onSubmit = (data: Props["data"]) => {
    saveChange({ ...data, phone });
    onClose();
  };

  useEffect(() => {
    if (phone.length === 0) setPhone(data.phone);
  }, [data]);

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
          <label className={styles["label"]}>
            <span className={styles["label-title"]}>Phone</span>
            <PhoneInput
              placeholder="Your phone number..."
              value={phone}
              onChange={(data) => setPhone(data)}
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

export default AddressEditor;
