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

function SubmitButton({
  text,
  cb,
}: {
  text: string;
  cb?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button onClick={cb} className={`${styles["submit-button"]} primary`}>
      {text}
    </button>
  );
}

function SignUp() {
  return (
    <form>
      <span className={styles["title"]}>Create account</span>
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
      <div className={styles["button-cont"]}>
        <SubmitButton text="Sign up" />
        <span className={styles["subtitle"]}>You already have an account?</span>
      </div>
    </form>
  );
}

function SignIn() {
  return (
    <form>
      <span className={styles["title"]}>Login</span>
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
      <div className={styles["button-cont"]}>
        <SubmitButton text="Sign in" />
        <span className={styles["subtitle"]}>You don't have an account?</span>
      </div>
    </form>
  );
}

interface LoginProps {
  register?: boolean;
}

function Login({ register = true }: LoginProps) {
  return (
    <div className={`${styles["body"]} secondary`}>
      <div className={styles["container"]}>
        {register ? <SignUp /> : <SignIn />}
        <AuthLogin />
      </div>
    </div>
  );
}

export default Login;
