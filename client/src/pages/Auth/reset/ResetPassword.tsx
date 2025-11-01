import React, { useState } from "react";
import styles from "./resetpassword.module.scss";
import InputComp from "../../../components/input/InputComp";
import ButtonComp from "../../../components/button/Button";
import { Link, useSearchParams } from "react-router-dom";
import { resetApi } from "../../../api/authApi";
import { toastMessage } from "../../../utils/toastMessage";
import { resetSchema } from "../../../validations/authSchema";

interface ErrorState {
  password: string | null;
  confirmPassword: string | null;
}

interface LoginData {
  password: string;
  confirmPassword: string;
}

interface Data {
  password: string;
  confirmPassword: string;
  token: string;
}

const ResetPassword = () => {
  const [userData, setUserData] = useState<LoginData>({
    password: "",
    confirmPassword: "",
  });
  const [errorState, setErrorState] = useState<ErrorState>({
    password: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isResetSuccess, setIsResetSuccess] = useState<boolean>(false);
  const [searchParams, _] = useSearchParams();

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

    setErrorState({ confirmPassword: null, password: null });

    const apiData: Data = {
      confirmPassword: userData?.confirmPassword,
      password: userData?.password,
      token: searchParams.get("token") || "",
      // token:
    };

    try {
      await resetSchema.validate(apiData, { abortEarly: false });
    } catch (err: any) {
      const newErrors: ErrorState = {
        confirmPassword: null,
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
      const { message } = await resetApi(apiData);
      toastMessage("success", message);
      setIsResetSuccess(true);
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
        {/* LEFT SIDE IMAGE */}
        <div className={styles.leftSideContainer}>
          <img src="/src/assets/images/reset.jpg" alt="Reset Password" />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className={styles.rightSideContainer}>
          <div className={styles.rightCont}>
            {/* Logo and App Name */}
            <div className={styles.upperCont}>
              <img
                src="/public/favicon.svg"
                alt="Logo"
                className={styles.logo}
              />
              <h1>QuickChat</h1>
            </div>

            {isResetSuccess ? (
              <div className={styles.successCont}>
                <h2>Password Reset Successful 🎉</h2>
                <p>
                  Your password has been updated successfully. You can now log
                  in with your new credentials.
                </p>
                <hr className={styles.hrfull} />

                <Link to="/login">
                  <ButtonComp btn="Back to Login" />
                </Link>
              </div>
            ) : (
              <>
                {/* Reset Password Form */}
                <form className={styles.inpCont} onSubmit={handleSubmit}>
                  <h2 className={styles.title}>Reset your password</h2>

                  <div>
                    <InputComp
                      placeholder="Enter new password"
                      label="New Password"
                      inputType="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      error={errorState.password}
                    />
                    <InputComp
                      placeholder="Confirm new password"
                      label="Confirm Password"
                      inputType="password"
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      error={errorState.confirmPassword}
                    />
                  </div>

                  <div className={styles.btnContainer}>
                    <ButtonComp btn="Reset Password" loading={loading} />
                  </div>
                </form>

                <hr className={styles.hrfull} />

                {/* Footer */}
                <div className={styles.lowerCont}>
                  <p className={styles.donthave}>
                    Remembered your password?{" "}
                    <span className={styles.signup}>
                      <Link to="/login">Back to Login</Link>
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
