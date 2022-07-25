import { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar-edit";
// Components
import ModalContainer from "./modals/ModalContainer";
// Icons
import { ReactComponent as DefaultUser } from "icons/default-user.svg";
import { ReactComponent as OptionsIcon } from "icons/menu-icon.svg";
import { ReactComponent as UploadIcon } from "icons/upload-icon.svg";
import { ReactComponent as EditIcon } from "icons/edit-pen-icon.svg";
import { ReactComponent as DeleteIcon } from "icons/trash-icon.svg";
// Styles
import styles from "./UserImage.module.css";

function UploadFile() {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState("");
  const maxFileSize = 2097152;

  const onClose = () => {
    setPreview("");
  };

  const onCrop = (preview: string) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (e: any) => {
    if (e.target.files[0].size > maxFileSize) {
      alert("2MB is the max file size");
      e.target.value = "";
    }
  };

  return (
    <div className={styles["upload-file-cont"]}>
      <span>File max size: 2MB</span>
      <Avatar
        width={350}
        height={250}
        imageWidth={350}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={file}
      />
      <img src={preview} alt="Preview" />
    </div>
  );
}

// interface Props {
//   tabs: Array<string>;
//   links: Array<{ label: string; to: string }>;
//   getSelected: (selected: string) => void;
// }

function UserImage() {
  // open and close options menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide menu if user click outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === containerRef.current) setToggleMenu(false);
  };

  // Manage outside module click
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    // Unmount listener
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={`${styles["user-image-cont"]} primary`}>
      <DefaultUser className={styles["user-image"]} />
      <OptionsIcon
        onClick={() => setToggleMenu((prev) => !prev)}
        className={styles["open-menu-button"]}
      />
      <div
        className={`${styles["options-menu"]} ${
          toggleMenu ? styles["options-menu-open"] : ""
        }`}
      >
        <span
          onClick={() => setToggleModal(true)}
          className={styles["options-button"]}
        >
          <span className={styles["icon-wrapper"]}>
            <UploadIcon />
          </span>
          Upload
        </span>
        <span className={styles["options-button"]}>
          <span className={styles["icon-wrapper"]}>
            <EditIcon />
          </span>
          Edit
        </span>
        <span className={styles["options-button"]}>
          <span className={styles["icon-wrapper"]}>
            <DeleteIcon />
          </span>
          Delete
        </span>
      </div>
      {/* if user click this span, hide menu */}
      <span
        ref={containerRef}
        className={`${styles["options-menu-cont"]} ${
          toggleMenu ? styles["options-menu-open"] : ""
        }`}
      ></span>
      {toggleModal && (
        <ModalContainer
          show={toggleModal}
          onShow={setToggleModal}
          closeWhenClickOutside={false}
        >
          <UploadFile />
        </ModalContainer>
      )}
    </div>
  );
}

export default UserImage;
