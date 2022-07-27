import { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar-edit";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// Components
import ModalContainer from "./modals/ModalContainer";
// Actions
import { updateAvatar, deleteAvatar } from "redux/action/user";
// Icons
import { ReactComponent as PhotoIcon } from "icons/photo-icon.svg";
import { ReactComponent as OptionsIcon } from "icons/menu-icon.svg";
import { ReactComponent as UploadIcon } from "icons/upload-icon.svg";
import { ReactComponent as DeleteIcon } from "icons/trash-icon.svg";
// Styles
import styles from "./UserImage.module.css";
const defaultImage = "https://static.thenounproject.com/png/17840-200.png";

function UploadFile({ onShow }: { onShow: (prev: boolean) => void }) {
  const [preview, setPreview] = useState(defaultImage);
  const maxFileSize = 2097152;
  // store
  const dispatch = useDispatch();

  const onClose = () => {
    setPreview(defaultImage);
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

  const handleUpload = () => {
    if (preview === defaultImage) return toast("Choose an image file");

    dispatch(updateAvatar({ avatar: preview }));
    onShow(false);
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
      />
      <img src={preview} alt="Preview" />
      <div className={styles["button-cont"]}>
        <button
          onClick={handleUpload}
          className={`${styles["submit-button"]} primary`}
        >
          Save changes
        </button>

        <span
          onClick={() => onShow(false)}
          className={`${styles["cancel-button"]} primary`}
        >
          Cancel
        </span>
      </div>
    </div>
  );
}

function UserImage() {
  // open and close options menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // store
  const dispatch = useDispatch();
  const { avatar } = useSelector((state: any) => state.user);

  const handleDelete = () => {
    if (!avatar) return;

    dispatch(deleteAvatar());
  };

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
    <div className={`${styles["container"]} primary`}>
      {avatar && avatar.length > 0 ? (
        <span className={styles["user-image"]}>
          <img src={avatar} alt="Avatar" />
        </span>
      ) : (
        <span className={styles["default-image"]}>
          <PhotoIcon />
        </span>
      )}
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
          onClick={() => {
            setToggleModal(true);
            setToggleMenu(false);
          }}
          className={styles["options-button"]}
        >
          <span className={styles["icon-wrapper"]}>
            <UploadIcon />
          </span>
          Upload
        </span>
        <span
          onClick={() => {
            handleDelete();
            setToggleMenu(false);
          }}
          className={`${styles["options-button"]} ${
            !avatar ? styles["options-button-disabled"] : ""
          }`}
        >
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
          <UploadFile onShow={setToggleModal} />
        </ModalContainer>
      )}
    </div>
  );
}

export default UserImage;
