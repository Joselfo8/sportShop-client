// Styles
import styles from "./ProfileCard.module.css";

export function Favorites() {

  return <div></div>
}

export function Orders() {

  return <div></div>
}

export function UserInfo() {
  return <div></div>
}

interface ProfileCardProps {
  children: React.ReactNode;
}

function ProfileCard({children}: ProfileCardProps) {
  return <div className={`${styles["container"]} secondary`}></div>;
}

export default ProfileCard;
