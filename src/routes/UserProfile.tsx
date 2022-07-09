import { useState } from "react";
// Components
import Tabs from "../components/Tabs";
import ProfileCard from "../components/ProfileCard/ProfileCard";
// Icons
import { ReactComponent as DefaultUser } from "../icons/default-user.svg";
// Styles
import styles from "./UserProfile.module.css";

function Sidebar({ getSelected }: { getSelected: (prev: string) => void }) {
  return (
    <div className={`${styles["sidebar"]} dark`}>
      <div className={styles["user-image-cont"]}>
        <DefaultUser className={styles["user-image"]} />
        {/* <img */}
        {/*   className={styles["user-image"]} */}
        {/*   src={} */}
        {/*   alt="user-image" */}
        {/* /> */}
      </div>
      <div className={styles["sidebar-body"]}>
        <Tabs
          tabs={["User information", "My orders", "My favorites"]}
          getSelected={getSelected}
        />
      </div>
    </div>
  );
}

function UserProfile() {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <div className={`${styles["body"]} secondary`}>
      <div className={styles["container"]}>
        <Sidebar getSelected={setSelectedTab} />
        <ProfileCard selected={selectedTab} />
      </div>
    </div>
  );
}

export default UserProfile;
