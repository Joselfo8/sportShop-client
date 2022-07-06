import { useState } from "react";
// Components
import Input from "../components/Input";
// Styles
import styles from "./Login.module.css";

function SignUp() {}

function SignIn() {
  return (
    <>
      <Input text="Email" id="email" getData={() => {}} />
      <Input text="Password" id="password" getData={() => {}} />
      <span className={styles["subtitle"]}>Forgot your password?</span>
    </>
  );
}

function Login() {
  return (
    <div className={`${styles["body"]} secondary`}>
      <form className={styles["container"]}>
        <span className={styles["title"]}>Login</span>
        <SignIn />
        <div className={styles["button-cont"]}>
          <button className={`${styles["submit-button"]} primary`}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
