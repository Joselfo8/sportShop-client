import { useState, useEffect, useRef } from "react";
// Icons
import { ReactComponent as ErrorIcon } from "../../icons/error-icon.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu-icon.svg";
// Styles
import styles from "./SidebarContainer.module.css";

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
  // show: boolean;
  // onShow: (prev: boolean) => void;
  children: React.ReactNode;
}

function SidebarContainer({ children }: Props) {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // hide container when user click menu button
  const handleShow = (e: React.FormEvent<HTMLSpanElement>) => {
    containerRef.current?.classList.toggle(styles["show"]);
    e.currentTarget?.classList.toggle(styles["menu-button-close"]);
  };

  return (
    // container
    <div
      ref={containerRef}
      className={`${styles["container"]} secondary transition-all`}
    >
      {/* content */}
      <div className={styles["content"]}>
        {children}
        <span
          onClick={handleShow}
          className={`${styles["menu-button"]} dark`}
        >
          <MenuIcon className="primary" />
        </span>
      </div>
    </div>
  );
}

export default SidebarContainer;
