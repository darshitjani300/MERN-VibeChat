import React, { useState } from "react";
import styles from "./forgetpassword.module.scss";
import InputComp from "../../../components/input/InputComp";
import ButtonComp from "../../../components/button/Button";
import { Link } from "react-router-dom";
import { forgetApi } from "../../../api/authApi";
import { toastMessage } from "../../../utils/toastMessage";
import { forgetSchema } from "../../../validations/authSchema";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errorState, setErrorState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorState(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorState(null);

    const data: { email: string } = {
      email: email,
    };

    try {
      await forgetSchema.validate(data, { abortEarly: false });
    } catch (err: any) {
      setErrorState(err.message);
      return;
    }

    try {
      setLoading(true);
      const { message } = await forgetApi(data);
      toastMessage("success", message);
      setIsEmailSent(true);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        "Something went wrong, Please try again later";
      toastMessage("error", apiMessage);
      setIsEmailSent(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return (
    <section>
      <div className={styles.mainCont}>
        {/* LEFT SIDE */}
        <div className={styles.leftSideContainer}>
          <img src="/src/assets/images/forget.jpg" alt="Forgot Password" />
        </div>

        {/* RIGHT SIDE */}
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

            {isEmailSent ? (
              <div className={styles.successCont}>
                <h2>Check your email</h2>
                <p>
                  We’ve sent a password reset link to <b>{email}</b>. Please
                  check your inbox and follow the link to reset your password.
                </p>

                <hr className={styles.hrfull} />
                <Link to="/login">
                  <ButtonComp btn="Back to Login" />
                </Link>
              </div>
            ) : (
              <>
                <form className={styles.inpCont} onSubmit={handleSubmit}>
                  <h2 className={styles.title}>Forgot your password?</h2>
                  <p className={styles.subtitle}>
                    No worries! Enter your email below and we’ll send you a
                    password reset link.
                  </p>

                  <div>
                    <InputComp
                      placeholder="Enter your email"
                      label="Email"
                      name="email"
                      inputType="email"
                      value={email}
                      onChange={handleChange}
                      error={errorState}
                    />
                  </div>

                  <ButtonComp btn="Send Reset Link" loading={loading} />
                </form>

                <hr className={styles.hrfull} />

                <div className={styles.lowerCont}>
                  <p className={styles.donthave}>
                    Remembered your password?{" "}
                    <span className={styles.signup}>
                      <Link to={"/login"}>Back to Login</Link>
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

export default ForgetPassword;
