// Components
import UserInfo from "./UserInfo";
import Orders from "./Orders";
import Favorites from "./Favorites";
// Styles
import styles from "./ProfileCard.module.css";

interface Props {
  selected: string;
}

function ProfileCard({ selected }: Props) {
  return (
    <div className={`${styles["container"]} secondary`}>
      <div className={styles["wrapper"]}>
        {selected === "user-information" && <UserInfo />}
        {selected === "my-orders" && <Orders />}
        {selected === "my-favorites" && <Favorites />}
      </div>
    </div>
  );
}

export default ProfileCard;
