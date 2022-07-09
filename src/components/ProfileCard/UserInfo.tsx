import { useState } from "react";
// Components
import EditLabel from "../EditLabel";
import ModalContainer from "../modals/ModalContainer";
import ProfileCard from "./ProfileCard";
// Icons
import { ReactComponent as ErrorIcon } from "../../icons/error-icon.svg";
import { ReactComponent as EditIcon } from "../../icons/edit-pen-icon.svg";
// Styles
import styles from "./UserInfo.module.css";

// function UpdateForm() {
//   return (
//     <div className={styles["button-cont"]}>
//       <button className={`${styles["submit-button"]} primary`}>
//         Save changes
//       </button>

//       <span className={`${styles["cancel-button"]} primary`}>Cancel</span>
//     </div>
//   );
// }

interface AddressProps {
  data: {
    name: string;
    address: string;
    secondAddress?: string;
    city: string;
    state: string;
    zipCode: number;
    phone: string;
  };
  edit: boolean;
  id: string;
  onEdit: (prev: boolean) => void;
  onDelete: (prev: string) => void;
}

function Address({ data, edit, id, onEdit, onDelete }: AddressProps) {
  return (
    <li className={`${styles["ship-li"]} primary`}>
      <span>{data.name}</span>
      <span>{data.address}</span>
      <span>{data.secondAddress}</span>
      <span>
        {data.city} {data.state} {data.zipCode}
      </span>
      <span>{data.phone}</span>
      {edit && (
        <div className={styles["address-buttons"]}>
          <>
            <span onClick={() => onEdit(true)}>
              <EditIcon />
            </span>
            <span onClick={() => onDelete(id)}>
              <ErrorIcon />
            </span>
          </>
        </div>
      )}
    </li>
  );
}

function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState<{
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    phone: string;
  }>({
    name: "John Doe",
    address: "Plaza Commerce St 172",
    city: "Dallas",
    state: "Texas",
    zipCode: 33172,
    phone: "555-01023021",
  });

  const handleSave = (val: string, key: string) => {
    setInfo((prev) => ({ ...prev, [key]: val }));
  };

  const handleDelete = (id: string) => console.log(id);

  return (
    <div className={styles["container"]}>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Shipping addresses</span>
        <span onClick={() => setEdit(!edit)} className={styles["edit-button"]}>
          {edit ? "Cancel" : "Edit"}
        </span>
      </div>
      <div className={styles["address-wrapper"]}>
        <Address
          data={{
            name: "John Doe",
            address: "Plaza Commerce St 172",
            city: "Dallas",
            state: "Texas",
            zipCode: 33172,
            phone: "555-01023021",
          }}
          edit={edit}
          id="first-address"
          onEdit={setShowModal}
          onDelete={handleDelete}
        />
      </div>
      {showModal && (
        <ModalContainer show={showModal} onShow={setShowModal}>
          <Address
            data={{
              name: "John Doe",
              address: "Plaza Commerce St 172",
              city: "Dallas",
              state: "Texas",
              zipCode: 33172,
              phone: "555-01023021",
            }}
            edit={edit}
            id="first-address"
            onEdit={setShowModal}
            onDelete={handleDelete}
          />
        </ModalContainer>
      )}
    </div>
  );
}

function PersonalInfo() {
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState<{
    name: string;
    lastName: string;
    username: string;
    email: string;
  }>({
    name: "John",
    lastName: "Doe",
    username: "JohnDoe123",
    email: "johndoe123@example.com",
  });

  const handleSave = (val: string, key: string) => {
    setInfo((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>User information</span>
        <span onClick={() => setEdit(!edit)} className={styles["edit-button"]}>
          {edit ? "Cancel" : "Edit"}
        </span>
      </div>

      <div className={styles["info-wrapper"]}>
        <EditLabel
          type="text"
          label="Name"
          id="name"
          edit={edit}
          value={info.name}
          onSave={(val) => handleSave(val, "name")}
        />
        <EditLabel
          type="text"
          label="Last Name"
          id="last-name"
          edit={edit}
          value={info.lastName}
          onSave={(val) => handleSave(val, "lastName")}
        />
        <EditLabel
          type="text"
          label="Username"
          id="username"
          edit={edit}
          value={info.username}
          onSave={(val) => handleSave(val, "username")}
        />
        <EditLabel
          type="text"
          label="Email"
          id="email"
          edit={edit}
          value={info.email}
          onSave={(val) => handleSave(val, "email")}
        />
      </div>
    </div>
  );
}

function UserInfo() {
  return (
    <>
      <PersonalInfo />
      <Addresses />
    </>
  );
}

export default UserInfo;
