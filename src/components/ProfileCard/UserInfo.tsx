import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import ModalContainer from "../modals/ModalContainer";
import AddressEditor from "../modals/AddressEditor";
import InfoEditor from "../modals/InfoEditor";
// Actions
import {
  updateUser,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from "../../redux/action/user";
// Icons
import { ReactComponent as ErrorIcon } from "../../icons/error-icon.svg";
import { ReactComponent as EditIcon } from "../../icons/edit-pen-icon.svg";
// Styles
import styles from "./UserInfo.module.css";

export interface AddressProps {
  data: {
    id: number;
    name: string;
    lastName: string;
    firstAddress: string;
    secondAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
  };
  edit: boolean;
  onEdit: (prev: boolean) => void;
  onDelete: (id: number) => void;
}

function Address({ data, edit, onEdit, onDelete }: AddressProps) {
  return (
    <li className={`${styles["ship-li"]} primary`}>
      <span>{data.name}</span>
      <span>{data.lastName}</span>
      <span>{data.firstAddress}</span>
      <span>{data.secondAddress}</span>
      <span>
        {data.city} {data.state} {data.zipCode}
      </span>
      <span>{data.phoneNumber}</span>
      {edit && (
        <div className={styles["address-buttons"]}>
          <>
            <span onClick={() => onEdit(true)}>
              <EditIcon />
            </span>
            <span onClick={() => onDelete(data.id)}>
              <ErrorIcon />
            </span>
          </>
        </div>
      )}
    </li>
  );
}

interface AddressesProps {
  data: Array<AddressProps["data"]>;
}

function Addresses({ data }: AddressesProps) {
  const [showModal, setShowModal] = useState(false);
  const toEditDefault = {
    id: 0,
    name: "",
    lastName: "",
    firstAddress: "",
    secondAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  };
  const [toEdit, setToEdit] = useState<AddressProps["data"]>(toEditDefault);
  const [edit, setEdit] = useState(false);
  // store
  const dispatch = useDispatch();

  const handleCreate = () => {
    setToEdit(toEditDefault);
    setEdit(false);
    setShowModal(true);
  };

  const handleEdit = (data: AddressProps["data"]) => {
    setShowModal(true);
    setToEdit(data);
  };

  const handleDelete = (id: number) => {
    const response = deleteShippingAddress(id);
    dispatch(response);
  };

  const onSubmit = (data: AddressProps["data"]) => {
    if (edit) {
      const response = updateShippingAddress(data);
      dispatch(response);
      return;
    }

    // add a new address
    const response = addShippingAddress(data);
    dispatch(response);
  };

  // reset toEdit state
  useEffect(() => {
    if (!edit) setToEdit(toEditDefault);
  }, [edit]);

  // if data.length === 0, edit is equal false
  useEffect(() => {
    if (data.length === 0) setEdit(false);
  }, [data]);

  return (
    <div className={styles["container"]}>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Shipping addresses</span>
        <div className={styles["edit-button-cont"]}>
          <span
            onClick={() => handleCreate()}
            className={styles["edit-button"]}
          >
            Add
          </span>
          <span className={styles["edit-button-separator"]}>|</span>
          <span
            onClick={() => {
              if (data.length === 0) return;
              setEdit(!edit);
            }}
            className={`${styles["edit-button"]} ${
              data.length === 0 ? styles["edit-button-disabled"] : ""
            }`}
          >
            {edit ? "Cancel" : "Edit"}
          </span>
        </div>
      </div>
      <div className={styles["address-wrapper"]}>
        {data && data.length > 0 ? (
          data.map((a) => (
            <Address
              key={a.id}
              data={a}
              edit={edit}
              onEdit={() => handleEdit(a)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
      {showModal && (
        <ModalContainer show={showModal} onShow={setShowModal}>
          <AddressEditor
            onClose={() => setShowModal(false)}
            saveChange={(data) => onSubmit(data)}
            data={toEdit}
          />
        </ModalContainer>
      )}
    </div>
  );
}

export interface InfoProps {
  data: {
    name: string;
    lastname: string;
    email: string;
    dateOfBirth: string;
    genre: string;
    avatar?: string;
  };
}

function Info({ data }: InfoProps) {
  const [showModal, setShowModal] = useState(false);
  // store
  const dispatch = useDispatch();

  const onSubmit = (data: InfoProps["data"]) => {
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
          <span>{data.name}</span>
        </div>
        <div className={styles["info"]}>
          <span>Last name:</span>
          <span>{data.lastname}</span>
        </div>
        <div className={styles["info"]}>
          <span>Email:</span>
          <span>{data.email}</span>
        </div>
        <div className={styles["info"]}>
          <span>Birthdate:</span>
          <span>
            {data.dateOfBirth !== null ? String(data.dateOfBirth) : ""}
          </span>
        </div>
        <div className={styles["info"]}>
          <span>Genre:</span>
          <span>{data.genre}</span>
        </div>
      </div>
      {showModal && (
        <ModalContainer show={showModal} onShow={setShowModal}>
          <InfoEditor
            onClose={() => setShowModal(false)}
            saveChange={(data: InfoProps["data"]) => onSubmit(data)}
            data={data}
          />
        </ModalContainer>
      )}
    </div>
  );
}

function UserInfo() {
  // store
  const user = useSelector((state: any) => state.user);

  return (
    <>
      <Info data={user} />
      <Addresses data={user.shippingAddresses} />
    </>
  );
}

export default UserInfo;
