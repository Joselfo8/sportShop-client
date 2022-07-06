import { useState } from "react";
// Components
import Input from "../components/Input";
// Styles
import styles from "./Login.module.css";

function SignUp() {}

function SignIn() {
  return (
    <>
      <Input
        text="Email"
        id="email"
        // required={undefined}
        // placeholder={undefined}
        getData={() => {}}
      />
    </>
  );
}

function Login() {
  return (
    <div className={styles["container"]}>
      <SignIn />
    </div>
  );
}

export default Login;
