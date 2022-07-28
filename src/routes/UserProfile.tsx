import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Components
import Tabs from "../components/Tabs";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SidebarContainer from "../components/modals/SidebarContainer";
import UserImage from "components/UserImage";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// Actions
import { getUser } from "redux/action/user";
// Styles
import styles from "./UserProfile.module.css";

function Sidebar({ getSelected }: { getSelected: (prev: string) => void }) {
  return (
    <div className={`${styles["sidebar"]} secondary`}>
      <UserImage />
      <div className={styles["sidebar-body"]}>
        <Tabs
          tabs={["User information"]}
          links={[{ label: "My favorites", to: "/favorites" }, { label: "My orders", to: "/user/order-list" }]}
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
  }, [user, dispatch]);

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
