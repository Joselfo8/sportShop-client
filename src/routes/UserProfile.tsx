import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Components
import Tabs from "../components/Tabs";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SidebarContainer from "../components/modals/SidebarContainer";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// Actions
import { getUser } from "redux/action/user";
// Icons
import { ReactComponent as DefaultUser } from "../icons/default-user.svg";
// Styles
import styles from "./UserProfile.module.css";

function Sidebar({ getSelected }: { getSelected: (prev: string) => void }) {
  return (
    <div className={`${styles["sidebar"]} secondary`}>
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
  // Store
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { user } = useSelector((state: any) => state);

  // if user data is not in store, make a request
  useEffect(() => {
    if (!user.name) {
      dispatch(getUser());
    }
  }, [user]);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className={`${styles["container"]} secondary`}>
      <Navbar />
      <div className={styles["wrapper"]}>
        <SidebarContainer>
          <Sidebar getSelected={setSelectedTab} />
        </SidebarContainer>
        <ProfileCard selected={selectedTab} />
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
