import React, { useState } from "react";
import styles from "../styles/auth.module.scss";
import InputComp from "../../../components/input/InputComp";
import ButtonComp from "../../../components/button/Button";
import { signupApi } from "../../../api/authApi";
import { toastMessage } from "../../../utils/toastMessage";
import { Link, useNavigate } from "react-router-dom";
// import { setToken } from "../../../utils/auth";
import { signupSchema } from "../../../validations/authSchema";

interface LoginData {
  username: string;
  email: string;
  password: string;
}

interface ErrorState {
  username: string | null;
  email: string | null;
  password: string | null;
}

const Signup = () => {
  const [userData, setUserData] = useState<LoginData>({
    username: "",
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState<ErrorState>({
    username: null,
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

    setErrorState({ email: null, password: null, username: null });

    const dataObj: LoginData = {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password,
    };

    try {
      await signupSchema.validate(dataObj, { abortEarly: false });
    } catch (error: any) {
      const newError: ErrorState = {
        username: null,
        email: null,
        password: null,
      };

      if (error?.inner?.length > 0) {
        error.inner.forEach((elem: { path: string; message: string }) => {
          newError[elem.path as keyof ErrorState] = elem.message;
        });
      }

      setErrorState(newError);
      return;
    }

    try {
      setLoading(true);
      const data = await signupApi(dataObj);
      toastMessage("success", data?.message);
      if (data?.data?.userToken) {
        // setToken(data?.data?.userToken);
      }
      navigate("/home");
    } catch (error: any) {
      toastMessage("error", error?.response?.data?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="/src/assets/images/signup.webp" alt="VibeChat background" />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            {/* Header section */}
            <div className={styles.header}>
              <img
                src="/favicon.svg"
                alt="VibeChat logo"
                className={styles.logo}
              />
              <h1>VibeChat</h1>
            </div>

            {/* Form section */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2 className={styles.title}>Create your VibeChat account 🚀</h2>
              <p className={styles.subtitles}>
                Join thousands of conversations happening every day. Quick,
                private, and made for connection.
              </p>
              <div>
                <InputComp
                  placeholder="Enter name"
                  label="Username"
                  inputType="text"
                  name={"username"}
                  value={userData?.username}
                  onChange={handleChange}
                  error={errorState.username}
                />
                <InputComp
                  placeholder="Enter email"
                  label="Email"
                  inputType="email"
                  value={userData?.email}
                  onChange={handleChange}
                  name={"email"}
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
              <ButtonComp btn="Sign up" loading={loading} />
            </form>

            <hr className={styles.divider} />

            {/* Alternative login */}
            <div className={styles.altLogin}>
              <ButtonComp btn="Or Sign up with Google" />
              <p className={styles.switchAuth}>
                Aready have an account?{" "}
                <Link to={"/login"} className={styles.switchLink}>
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
