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
  data: ShippingAddress;
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

interface ShippingAddress {
  name: string;
  address: string;
  secondAddress?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

function Addresses({
  name,
  address,
  secondAddress,
  city,
  state,
  zipCode,
  phone,
}: ShippingAddress) {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = { name, address, secondAddress, city, state, zipCode, phone };

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
          data={data}
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
            saveChange={(data) => console.log(data)}
            data={data}
          />
        </ModalContainer>
      )}
    </div>
  );
}

function Info({ name, lastname, email, dateOfBirth, genre }: Data) {
  const [showModal, setShowModal] = useState(false);
  // store
  const dispatch = useDispatch();

  const onSubmit = (data: Data) => {
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
          <span>{name}</span>
        </div>
        <div className={styles["info"]}>
          <span>Last name:</span>
          <span>{lastname}</span>
        </div>
        <div className={styles["info"]}>
          <span>Email:</span>
          <span>{email}</span>
        </div>
        <div className={styles["info"]}>
          <span>Birthdate:</span>
          <span>{dateOfBirth}</span>
        </div>
        <div className={styles["info"]}>
          <span>Genre:</span>
          <span>{genre}</span>
        </div>
      </div>
      {showModal && (
        <ModalContainer show={showModal} onShow={setShowModal}>
          <InfoEditor
            onClose={() => setShowModal(false)}
            saveChange={(data: Data) => onSubmit(data)}
            data={{ name, lastname, email, dateOfBirth, genre }}
          />
        </ModalContainer>
      )}
    </div>
  );
}

interface Data {
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  genre: string;
}

function UserInfo() {
  // store
  const auth = useSelector((state: any) => state.auth.auth);
  const user = {
    name: auth.user.name,
    lastname: auth.user.lastname,
    dateOfBirth: auth.user.dateOfBirth,
    genre: auth.user.genre,
    email: auth.user.email,
  };
  const shippingAddress = {
    name: auth.user.name,
    address: auth.user.direction,
    secondAddress: "Plaza Commerce St 172",
    city: "Dallas",
    state: "Texas",
    zipCode: "33172",
    phone: "555-01023021",
  };

  return (
    <>
      <Info {...user} />
      <Addresses {...shippingAddress} />
    </>
  );
}

export default UserInfo;
