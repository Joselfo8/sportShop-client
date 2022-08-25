import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
// Components
import Input from "../Input";
// Styles
import styles from "./AddressEditor.module.css";
import "react-phone-input-2/lib/style.css";
// Validations
import validate from "helpers/validations";
// Interfaces
import { AddressProps } from "components/ProfileCard/UserInfo";

interface Props {
  data: AddressProps["data"];
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
    saveChange({ ...data, phoneNumber: phone });
    onClose();
  };

  useEffect(() => {
    if (phone.length === 0) setPhone(data.phoneNumber);
  }, [data]);

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="name"
            label="Name *"
            rules={{
              required: true,
              maxLength: {
                value: 16,
                message: "Name can have a maximum of 16 characters",
              },
              pattern: {
                value: validate.onlyLetters,
                message: "Name can only include letters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="lastName"
            label="Last Name *"
            rules={{
              required: true,
              maxLength: {
                value: 20,
                message: "Last name can have a maximum of 20 characters",
              },
              pattern: {
                value: validate.onlyLetters,
                message: "Last name can only include letters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="firstAddress"
            label="Address Line *"
            rules={{
              required: true,
              maxLength: {
                value: 50,
                message: "Address can have a maximum of 50 characters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="secondAddress"
            label="Address Line 2"
            rules={{
              maxLength: {
                value: 50,
                message: "Address can have a maximum of 50 characters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="city"
            label="City *"
            rules={{
              required: true,
              maxLength: {
                value: 20,
                message: "City name can have a maximum of 20 characters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="state"
            label="State *"
            rules={{
              required: true,
              maxLength: {
                value: 20,
                message: "State name can have a maximum of 20 characters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="country"
            label="Country *"
            rules={{
              required: true,
              maxLength: {
                value: 20,
                message: "Country name can have a maximum of 20 characters",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <Input
            control={control}
            name="zipCode"
            label="Zip code *"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: "A minimum of 3 characters is required",
              },
              maxLength: {
                value: 10,
                message: "10 characters maximum",
              },
            }}
          />
        </div>
        <div className={styles["wrapper"]}>
          <label className={styles["label"]}>
            <span className={styles["label-title"]}>Phone *</span>
            <PhoneInput
              placeholder="Your phone number..."
              value={phone}
              onChange={(_1, _2, _3, formattedValue) =>
                setPhone(formattedValue)
              }
              inputProps={{ required: true }}
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
