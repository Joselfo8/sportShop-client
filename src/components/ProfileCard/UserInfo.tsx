import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import ModalContainer from "../modals/ModalContainer";
import AddressEditor from "../modals/AddressEditor";
import InfoEditor from "../modals/InfoEditor";
// Actions
import { updateUser } from "../../redux/action/auth";
// Icons
import { ReactComponent as ErrorIcon } from "../../icons/error-icon.svg";
import { ReactComponent as EditIcon } from "../../icons/edit-pen-icon.svg";
// Styles
import styles from "./UserInfo.module.css";

interface AddressProps {
  data: {
    name: string;
    address: string;
    secondAddress?: string;
    city: string;
    state: string;
    zipCode: string;
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
    secondAddress?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  }>({
    name: "John Doe",
    address: "Plaza Commerce St 172",
    secondAddress: "",
    city: "Dallas",
    state: "Texas",
    zipCode: "33172",
    phone: "555-01023021",
  });

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
          data={info}
          edit={edit}
          id="first-address"
          onEdit={setShowModal}
          onDelete={handleDelete}
        />
      </div>
      {showModal && (
        <ModalContainer show={showModal} onShow={setShowModal}>
          <AddressEditor
            onClose={() => setShowModal(false)}
            saveChange={(data) => setInfo(data)}
            data={info}
          />
        </ModalContainer>
      )}
    </div>
  );
}

interface PersonalInfoData {
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  genre: string;
}

function PersonalInfo() {
  const [showModal, setShowModal] = useState(false);
  // store
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth.auth);

  const onSubmit = (data: PersonalInfoData) => {
    const response = updateUser(data);
    dispatch(response);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>User information</span>
        <span
          onClick={() => setShowModal(!showModal)}
          className={styles["edit-button"]}
        >
          Edit
        </span>
      </div>
      <div className={styles["info-wrapper"]}>
        <div className={styles["info"]}>
          <span>Name:</span>
          <span>{auth.user.name}</span>
        </div>
        <div className={styles["info"]}>
          <span>Last name:</span>
          <span>{auth.user.lastname}</span>
        </div>
        <div className={styles["info"]}>
          <span>Email:</span>
          <span>{auth.user.email}</span>
        </div>
        <div className={styles["info"]}>
          <span>Birthdate:</span>
          <span>{auth.user.dateOfBirth}</span>
        </div>
        <div className={styles["info"]}>
          <span>Genre:</span>
          <span>{auth.user.genre}</span>
        </div>
      </div>
      {showModal && (
        <ModalContainer show={showModal} onShow={setShowModal}>
          <InfoEditor
            onClose={() => setShowModal(false)}
            saveChange={(data: PersonalInfoData) => onSubmit(data)}
            data={auth.user}
          />
        </ModalContainer>
      )}
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
