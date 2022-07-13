import { useState, useRef } from "react";
// Icons
import { ReactComponent as ErrorIcon } from "../../icons/error-icon.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu-icon.svg";
// Styles
import styles from "./SidebarContainer.module.css";

interface Props {
  children: React.ReactNode;
}

function SidebarContainer({ children }: Props) {
  const [iconToggle, setIconToggle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // hide container when user click menu button
  const handleShow = (e: React.FormEvent<HTMLSpanElement>) => {
    setIconToggle((prev) => !prev);
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
        <span onClick={handleShow} className={`${styles["menu-button"]} dark`}>
          {iconToggle ? (
            <ErrorIcon className="primary" />
          ) : (
            <MenuIcon className="primary" />
          )}
        </span>
      </div>
    </div>
  );
}

export default SidebarContainer;
