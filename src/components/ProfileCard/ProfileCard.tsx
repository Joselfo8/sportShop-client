// Components
import Favorites from "./Favorites";
import Orders from "./Orders";
import UserInfo from "./UserInfo";
// Styles
import styles from "./ProfileCard.module.css";

interface ProfileCardProps {
  children?: React.ReactNode;
}

function ProfileCard({ children }: ProfileCardProps) {
  return (<div className={`${styles["container"]} secondary`}>
    <UserInfo />
  </div>);
}

export default ProfileCard;
