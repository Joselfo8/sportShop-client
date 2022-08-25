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
    <div ref={containerRef} className={`${styles["container"]} transition-all`}>
      {/* content */}
      {children}
      <span onClick={handleShow} className={`${styles["menu-button"]} primary`}>
        {iconToggle ? (
          <ErrorIcon className="secondary" />
        ) : (
          <MenuIcon className="secondary" />
        )}
      </span>
    </div>
  );
}

export default SidebarContainer;
