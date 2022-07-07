import { useState } from "react";
// Components
import Input from "../components/Input";
// Icons
import { ReactComponent as FacebookIcon } from "../icons/facebook-icon.svg";
import { ReactComponent as GoogleIcon } from "../icons/google-icon.svg";
import { ReactComponent as LinkedinIcon } from "../icons/linkedin-icon.svg";
// Styles
import styles from "./Login.module.css";

function AuthLogin() {
  return (
    <div className={styles["social-media"]}>
      <span className={styles["or-subtitle"]}>Or login with</span>
      <FacebookIcon className={styles["social-media-icon"]} />
      <GoogleIcon className={styles["social-media-icon"]} />
      <LinkedinIcon className={styles["social-media-icon"]} />
    </div>
  );
}

function SignUp() {
  return (
    <>
      <div className={styles["input-wrapper"]}>
        <Input text="Username" id="username" getData={() => {}} />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input text="Email" id="email" getData={() => {}} />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          text="Password"
          type="password"
          id="password"
          getData={() => {}}
        />
      </div>

      <div className={styles["input-wrapper"]}>
        <Input
          text="Repeat password"
          type="password"
          id="repeat-password"
          getData={() => {}}
        />
      </div>
    </>
  );
}

function SignIn() {
  return (
    <>
      <div className={styles["input-wrapper"]}>
        <Input text="Email" id="email" getData={() => {}} />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          text="Password"
          type="password"
          id="password"
          getData={() => {}}
        />
        <span className={styles["subtitle"]}>Forgot your password?</span>
      </div>
    </>
  );
}

interface LoginProps {
  register?: boolean;
}

function Login({ register = false }: LoginProps) {
  return (
    <div className={`${styles["body"]} secondary`}>
      <div className={styles["container"]}>
        <form>
          <span className={styles["title"]}>
            {register ? "Create account" : "Login"}
          </span>
          {register ? <SignUp /> : <SignIn />}
          <div className={styles["button-cont"]}>
            <button className={`${styles["submit-button"]} primary`}>
              {register ? "Sign up" : "Sign in"}
            </button>
            <span className={styles["subtitle"]}>
              {register
                ? "You already have an account?"
                : "You don't have an account?"}
            </span>
          </div>
        </form>
        <AuthLogin />
      </div>
    </div>
  );
}

export default Login;
