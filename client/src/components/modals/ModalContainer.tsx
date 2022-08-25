import { useEffect, useRef } from "react";
// Icons
import { ReactComponent as ErrorIcon } from "../../icons/error-icon.svg";
// Styles
import styles from "./ModalContainer.module.css";

function CloseButton({ onShow }: { onShow: (prev: boolean) => void }) {
  return (
    <div className={styles["close-button-cont"]}>
      <button
        onClick={() => onShow(false)}
        type="button"
        className={`${styles["close-button"]} primary`}
      >
        <ErrorIcon />
      </button>
    </div>
  );
}

interface Props {
  show: boolean;
  onShow: (prev: boolean) => void;
  closeWhenClickOutside?: boolean;
  children: React.ReactNode;
}

function ModalContainer({
  show,
  onShow,
  closeWhenClickOutside = true,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide body scrollbar
  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  // Hide modal if user click outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === containerRef.current) onShow(false);
  };

  // Manage outside module click
  useEffect(() => {
    if (closeWhenClickOutside)
      window.addEventListener("click", handleOutsideClick);

    // Unmount listener
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    // Modal container
    <div
      ref={containerRef}
      className={`${styles["container"]} primary ${!show ? "hidden" : ""}`}
    >
      {/* Modal content */}
      <div className={`${styles["modal-content"]} secondary`}>
        <CloseButton onShow={onShow} />
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
