import { Navigate } from "react-router-dom";

interface Props {
  outlet: JSX.Element;
}

function RouteGuard({ outlet }: Props) {
  // check user has JWT token
  const hasJWT = () => {
    let flag = false;

    localStorage.getItem("token") ? (flag = true) : (flag = false);

    return flag;
  };

  return hasJWT() ? outlet : <Navigate to={{ pathname: "/login" }} />;
}

export default RouteGuard;
