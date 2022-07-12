import { useState, useEffect } from "react";
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
  const [values, setValues] = useState<Props["data"]>({
    name: "",
    address: "",
    secondAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  // make a backup of data
  useEffect(() => {
    setValues(data);
  }, [data]);

  const handleChange = (val: string, key: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <Input
          text="Name"
          id="name"
          defaultValue={values.name}
          getData={(v: string) => handleChange(v, "name")}
        />
      </div>
      <div className={styles["wrapper"]}>
        <Input
          text="Address Line"
          id="address"
          defaultValue={values.address}
          getData={(v: string) => handleChange(v, "address")}
        />
      </div>
      <div className={styles["wrapper"]}>
        <Input
          text="Address Line 2"
          id="second-address"
          defaultValue={values.secondAddress}
          getData={(v: string) => handleChange(v, "secondAddress")}
        />
      </div>
      <div className={styles["wrapper"]}>
        <Input
          text="City"
          id="city"
          defaultValue={values.city}
          getData={(v: string) => handleChange(v, "city")}
        />
      </div>
      <div className={styles["wrapper"]}>
        <Input
          text="State"
          id="state"
          defaultValue={values.state}
          getData={(v: string) => handleChange(v, "state")}
        />
      </div>
      <div className={styles["wrapper"]}>
        <Input
          text="Zip code"
          id="zip-code"
          defaultValue={values.zipCode}
          getData={(v: string) => handleChange(v, "zipCode")}
        />
      </div>
      <div className={styles["wrapper"]}>
        <Input
          text="Phone"
          id="phone"
          defaultValue={values.phone}
          getData={(v: string) => handleChange(v, "phone")}
        />
      </div>
      <div className={styles["button-cont"]}>
        <button
          onClick={() => {
            saveChange(values);
            // close modal
            onClose();
          }}
          className={`${styles["submit-button"]} primary`}
        >
          Save changes
        </button>

        <span
          onClick={() => onClose()}
          className={`${styles["cancel-button"]} primary`}
        >
          Cancel
        </span>
      </div>
    </div>
  );
}

export default AddressEditor;
