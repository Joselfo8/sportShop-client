import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// Components
import Input from "../components/Input";
// Actions
import { login, register } from "../redux/action/auth";
// Icons
import { ReactComponent as FacebookIcon } from "../icons/facebook-icon.svg";
import { ReactComponent as GoogleIcon } from "../icons/google-icon.svg";
import { ReactComponent as LinkedinIcon } from "../icons/linkedin-icon.svg";
// Styles
import styles from "./Login.module.css";
// Validate inputs
const userRegex = /^[a-zA-Z0-9_-]*$/g;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

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

interface SignUpInput {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function SignUp() {
  const { handleSubmit, control, getValues } = useForm<any>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onChange",
  });
  // Store
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { message } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();

  // send data to api
  const onSubmit = async (data: SignUpInput) => {
    try {
      const response = await register(data.username, data.email, data.password);
      dispatch(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className={styles["title"]}>Create account</span>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="username"
          label="Username"
          rules={{
            required: true,
            minLength: {
              value: 4,
              message: "Username need a minimum of 4 characters",
            },
            maxLength: {
              value: 16,
              message: "Username can have 16 characters maximum",
            },
            pattern: {
              value: userRegex,
              message:
                "Username can only include letters, numbers, dash and underscore",
            },
          }}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="email"
          label="Email"
          rules={{
            required: true,
            pattern: {
              value: emailRegex,
              message: "Introduce a valid email address",
            },
          }}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="password"
          label="Password"
          type="password"
          rules={{
            required: true,
            maxLength: {
              value: 20,
              message: "Password can have 20 characters maximum",
            },
            pattern: {
              value: passwordRegex,
              message:
                "Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
            },
          }}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="repeatPassword"
          label="Repeat Password"
          type="password"
          rules={{
            required: true,
            validate: (value: any) =>
              value === getValues("password") || "Should be equal to password",
          }}
        />
      </div>
      <div className={styles["button-cont"]}>
        <SubmitButton text="Sign up" />
        <Link to="/login" className={styles["subtitle"]}>
          You already have an account?
        </Link>
      </div>
    </form>
  );
}

interface SignInInput {
  email: string;
  password: string;
}

function SignIn() {
  const { handleSubmit, control } = useForm<any>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  // Store
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { message } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();

  // send data to api
  const onSubmit = async (data: SignInInput) => {
    try {
      const response = await login(data.email, data.password);

      dispatch(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className={styles["title"]}>Login</span>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="email"
          label="Email"
          rules={{
            required: true,
            pattern: {
              value: emailRegex,
              message: "Introduce a valid email address",
            },
          }}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          type="password"
          name="password"
          label="Password"
          rules={{
            required: true,
          }}
        />
        <span className={styles["subtitle"]}>Forgot your password?</span>
      </div>
      <div className={styles["button-cont"]}>
        <SubmitButton text="Sign in" />
        <Link to="/login/r" className={styles["subtitle"]}>
          You don't have an account?
        </Link>
      </div>
    </form>
  );
}

function Login() {
  const { register } = useParams();

  return (
    <div className={`${styles["body"]} secondary`}>
      <div className={styles["container"]}>
        {register === "r" ? <SignUp /> : <SignIn />}
        <AuthLogin />
      </div>
    </div>
  );
}

export default Login;
