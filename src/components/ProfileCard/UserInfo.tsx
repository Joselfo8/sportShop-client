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

interface AddressProps {
  name: string;
  address: string;
  secondAddress?: string;
  city: string;
  state: string;
  zipCode: number;
  phone: string;
}

function Address({
  name,
  address,
  secondAddress,
  city,
  state,
  zipCode,
  phone,
}: AddressProps) {
  return (
    <li className={`${styles["ship-li"]} primary`}>
      <span>{name}</span>
      <span>{address}</span>
      <span>{secondAddress}</span>
      <span>
        {city} {state} {zipCode}
      </span>
      <span>{phone}</span>
    </li>
  );
}

function AddressCont({ edit }: { edit: boolean }) {
  return (
    <div className={styles["container"]}>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Shipping addresses</span>
        <span className={styles["edit-button"]}>Edit</span>
      </div>
      <form className={styles["shipping-form"]} action="#">
        <Address
          name="John Doe"
          address="Plaza Commerce St 172"
          city="Dallas"
          state="Texas"
          zipCode={33172}
          phone="555-01023021"
        />

        <Address
          name="John Doe"
          address="Plaza Commerce St 172"
          city="Dallas"
          state="Texas"
          zipCode={33172}
          phone="555-01023021"
        />

        <Address
          name="John Doe"
          address="Plaza Commerce St 172"
          city="Dallas"
          state="Texas"
          zipCode={33172}
          phone="555-01023021"
        />

        <Address
          name="John Doe"
          address="Plaza Commerce St 172"
          city="Dallas"
          state="Texas"
          zipCode={33172}
          phone="555-01023021"
        />
      </form>
      {edit && <UpdateForm />}
    </div>
  );
}

function PersonalInfo({ edit }: { edit: boolean }) {
  return (
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
        {edit && <UpdateForm />}
      </form>
    </div>
  );
}

function UserInfo() {
  return (
    <>
      <PersonalInfo edit={false} />
      <AddressCont edit={false} />
    </>
  );
}

export default UserInfo;
