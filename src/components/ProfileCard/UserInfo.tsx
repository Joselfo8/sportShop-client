// Components
import Input from "../Input";
// Styles
import styles from "./UserInfo.module.css";

function UpdateForm() {
  return (
    <div className={styles["button-cont"]}>
      <button className={`${styles["submit-button"]} primary`}>
        Save changes
      </button>

      <span className={`${styles["cancel-button"]} primary`}>Cancel</span>
    </div>
  );
}

interface ShippingAddressProps {
  name: string;
  address: string;
  secondAddress?: string;
  city: string;
  state: string;
  zipCode: number;
  phone: string;
}

function ShippingAddress({
  name,
  address,
  secondAddress,
  city,
  state,
  zipCode,
  phone,
}: ShippingAddressProps) {
  return (
    <li className={`${styles["ship-li"]} primary`}>
      <span>{name}</span>
      <span>{address}</span>
      <span>{secondAddress}</span>
      <span>{city} {state} {zipCode}</span>
      <span>{phone}</span>
    </li>
  );
}

function UserInfo() {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["title-cont"]}>
          <span className={styles["title"]}>User information</span>
          <span className={styles["edit-button"]}>Edit</span>
        </div>

        <form className={styles["form"]} action="#">
          <Input
            text="Name"
            placeholder="First name"
            id="name"
            getData={(data: string) => console.log(data)}
          />
          <Input
            text="Last name"
            placeholder="Last name"
            id="name"
            getData={(data: string) => console.log(data)}
          />
          <Input
            text="Username"
            placeholder="Username"
            id="username"
            getData={(data: string) => console.log(data)}
          />
          <Input
            text="Email"
            placeholder="Email"
            id="email"
            getData={(data: string) => console.log(data)}
          />
          <UpdateForm />
        </form>
      </div>
      <div className={styles["container"]}>
        <div className={styles["title-cont"]}>
          <span className={styles["title"]}>Shipping addresses</span>
          <span className={styles["edit-button"]}>Edit</span>
        </div>
        <form className={styles["shipping-form"]} action="#">
          <ShippingAddress
            name="John Doe"
            address="Plaza Commerce St 172"
            city="Dallas"
            state="Texas"
            zipCode={33172}
            phone="555-01023021"
          />

          <ShippingAddress
            name="John Doe"
            address="Plaza Commerce St 172"
            city="Dallas"
            state="Texas"
            zipCode={33172}
            phone="555-01023021"
          />

          <ShippingAddress
            name="John Doe"
            address="Plaza Commerce St 172"
            city="Dallas"
            state="Texas"
            zipCode={33172}
            phone="555-01023021"
          />

          <ShippingAddress
            name="John Doe"
            address="Plaza Commerce St 172"
            city="Dallas"
            state="Texas"
            zipCode={33172}
            phone="555-01023021"
          />
        </form>
        <UpdateForm />
      </div>
    </>
  );
}

export default UserInfo;
