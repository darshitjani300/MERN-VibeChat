import React, { useState } from "react";
import styles from "./login.module.scss";
import InputComp from "../../../components/input/InputComp";
import ButtonComp from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/authApi";
import { setToken } from "../../../utils/auth";
import { toastMessage } from "../../../utils/toastMessage";
import { loginSchema } from "../../../validations/authSchema";

interface ErrorState {
  email: string | null;
  password: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState<ErrorState>({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name) {
      setErrorState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorState({ email: null, password: null });

    const dataObj: {
      email: string;
      password: string;
    } = {
      email: userData?.email,
      password: userData?.password,
    };

    try {
      await loginSchema.validate(dataObj, { abortEarly: false });
    } catch (err: any) {
      const newErrors: ErrorState = {
        email: null,
        password: null,
      };
      if (err.inner?.length > 0) {
        err.inner.forEach((error: { path: string; message: string }) => {
          newErrors[error.path as keyof ErrorState] = error.message;
        });
      }

      setErrorState(newErrors);
      return;
    }

    try {
      setLoading(true);
      const { message, data } = await loginApi(dataObj);
      toastMessage("success", message);

      if (data?.userToken) {
        setToken(data?.userToken);
      }

      navigate("/home");
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        "Something went wrong, Please try again later";
      toastMessage("error", apiMessage);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return (
    <section>
      <div className={styles.mainCont}>
        <div className={styles.leftSideContainer}>
          <img src="/src/assets/images/login.jpg" alt="Logo" />
        </div>

        <div className={styles.rightSideContainer}>
          <div className={styles.rightCont}>
            <div className={styles.upperCont}>
              <img
                src="/public/favicon.svg"
                alt="Logo"
                className={styles.logo}
              />
              <h1>QuickChat</h1>
            </div>

            <form className={styles.inpCont} onSubmit={handleSubmit}>
              <h2 className={styles.nicework}>Nice to see you again</h2>
              <div>
                <InputComp
                  placeholder="Enter email"
                  label="Email"
                  name="email"
                  inputType="email"
                  value={userData?.email}
                  onChange={handleChange}
                  error={errorState.email}
                />
                <InputComp
                  placeholder="Enter password"
                  label="Password"
                  inputType="password"
                  value={userData?.password}
                  onChange={handleChange}
                  name={"password"}
                  error={errorState.password}
                />
              </div>
              <div>
                <div className={styles.forget}>
                  <div className={styles.remeb}>
                    <input type="checkbox" />
                    <label htmlFor="checkbox">Remeber me</label>
                  </div>
                  <p className={styles.pforget}>
                    <Link to={"/forgetpassword"}>Forgot Password?</Link>
                  </p>
                </div>
                <ButtonComp btn="Login" loading={loading} />
              </div>
            </form>

            <hr className={styles.hrfull} />

            <div className={styles.lowerCont}>
              <ButtonComp btn="Or Sign in with Google" />
              <p className={styles.donthave}>
                Don't have an account?{" "}
                <span className={styles.signup}>
                  <Link to={"/signup"}>Sign up now</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
