import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// Components
import Input from "../components/Input";
// Actions
import { login, register, logout } from "../redux/action/auth";
// Services
import authService from "services/auth.service";
// Icons
// import { ReactComponent as FacebookIcon } from "../icons/facebook-icon.svg";
// import { ReactComponent as GoogleIcon } from "../icons/google-icon.svg";
// import { ReactComponent as LinkedinIcon } from "../icons/linkedin-icon.svg";
// Styles
import styles from "./Login.module.css";
import { useEffect } from "react";
import { clearMessage } from "../redux/action/message";
// Validations
import validate from "../helpers/validations";
import axios from "axios";
import { toast } from "react-toastify";

// function AuthLogin() {
//   return (
//     <div className={styles["social-media"]}>
//       <span className={styles["or-subtitle"]}>Or login with</span>
//       <FacebookIcon className={styles["social-media-icon"]} />
//       <GoogleIcon className={styles["social-media-icon"]} />
//       <LinkedinIcon className={styles["social-media-icon"]} />
//     </div>
//   );
// }

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

function PasswordRecovery() {
  const { handleSubmit, control } = useForm<any>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  // send data to api
  const onSubmit = async (data: SignInInput) => {
    try {
      await authService.passwordRecovery(data.email);
      toast("New password sent to your email");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className={styles["title"]}>Password recovery</span>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="email"
          label="Email"
          rules={{
            required: true,
            pattern: {
              value: validate.email,
              message: "Introduce a valid email address",
            },
          }}
        />
      </div>
      <div className={styles["button-cont"]}>
        <SubmitButton text="Submit" />
      </div>
    </form>
  );
}

interface SignUpInput {
  name: string;
  lastname: string;
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
  const [redirect, setRedirect] = useState(false);
  // Store
  const {
    auth: { isLoggedIn },
    message,
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  // send data to api
  const onSubmit = async (data: SignUpInput) => {
    try {
      const response = await register(
        data.name,
        data.lastname,
        data.email,
        data.password
      );

      dispatch(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (message === "registered") setRedirect(true);
  }, [message]);

  if (isLoggedIn) return <Navigate to="/" />;
  if (redirect) {
    dispatch(clearMessage());
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className={styles["title"]}>Create account</span>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="name"
          label="Name"
          rules={{
            required: true,
            maxLength: {
              value: 30,
              message: "Name can have a maximum of 30 characters",
            },
            pattern: {
              value: validate.onlyLetters,
              message: "Name can only include letters",
            },
          }}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="lastname"
          label="Last Name"
          rules={{
            required: true,
            maxLength: {
              value: 30,
              message: "Last name can have a maximum of 30 characters",
            },
            pattern: {
              value: validate.onlyLetters,
              message: "Last name can only include letters",
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
              value: validate.email,
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
              value: validate.password,
              message:
                "Password should have minimum ten characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
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
              value: validate.email,
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
            maxLength: {
              value: 20,
              message: "Password can have 20 characters maximum",
            },
          }}
        />
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

function ForgotPassword() {
  function handleForgot(e: any): void {
    const { REACT_APP_API_URL } = process.env;
    axios
      .post(`${REACT_APP_API_URL}/mailer/password-recovery`, {
        email: e.email,
      })
      .then((e) => {
        toast("new password sent to your email");
      })
      .catch((e) => {
        toast("failed to send new password");
      });
  }

  const { handleSubmit, control } = useForm<any>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(handleForgot)}>
      <span className={styles["title"]}>Forgot password</span>
      <div className={styles["input-wrapper"]}>
        <Input
          control={control}
          name="email"
          label="Email"
          rules={{
            required: true,
            pattern: {
              value: validate.email,
              message: "Introduce a valid email address",
            },
          }}
        />
      </div>
      <div className={styles["button-cont"]}>
        <SubmitButton text="Send" />
        <Link to="/login" className={styles["subtitle"]}>
          You already have an account?
        </Link>
      </div>
    </form>
  );
}
function Login() {
  //estado que controla el forgot password
  const [getForgot, setForgot] = useState(false);

  //funcion de cambio de estado
  function handleForgot(e: any): void {
    setForgot(!getForgot);
  }
  const { register } = useParams();
  // store
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (register === "logout" && isLoggedIn) {
      dispatch(logout());
    }
  }, [register, isLoggedIn, dispatch]);

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div className={`${styles["body"]} secondary`}>
      <div className={styles["container"]}>
        {getForgot ? (
          <ForgotPassword />
        ) : register === "r" ? (
          <SignUp />
        ) : (
          <SignIn />
        )}
        <br />
        <br />
        <br />
        <span className={styles["subtitle"]} onClick={handleForgot}>
          {getForgot ? "Back to login" : "Forgot password?"}
        </span>
      </div>
    </div>
  );
}

export default Login;
