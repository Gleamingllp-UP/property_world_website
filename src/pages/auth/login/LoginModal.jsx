import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../Custom_Components/ErrorMessage";
import { showToast } from "../../../utils/toast/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordThunk,
  userLoginThunk,
} from "../../../features/user/userSlice";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";

function LoginModal({ show, onHide }) {
  const [type, setType] = useState("password");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store?.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: resisterForgetPassword,
    handleSubmit: handleSubmitForgetPassword,
    formState: { errors: errorsForgetPassword },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(userLoginThunk(data));
      if (userLoginThunk.fulfilled.match(resultAction)) {
        showToast("Login Successfull!", "success");
        setTimeout(() => {
          onHide();
          navigate(pageRoutes.USER_DASHBOARD);
        }, 500);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Login.", "error");
    }
  };

  const onSubmit2 = async (data) => {
    try {
      const { email } = data;
      const resultAction = await dispatch(forgetPasswordThunk({ email }));
      if (forgetPasswordThunk.fulfilled.match(resultAction)) {
        showToast(
          "Reset password link has been sent to your email.",
          "success"
        );
        setTimeout(() => {
          onHide();
        }, 500);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to send.", "error");
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={() => {
        setStep(1);
        onHide();
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="d-flex justify-content-center align-items-center position-relative"
        style={{ background: "rgb(0 54 125 / 22%)", borderRadius: "0px" }}
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="flex-grow-1 text-center ml-4"
        >
          {step === 1 && "Log In"}
          {step === 2 && "Forgot your password?"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login_areee step1">
              <div className="gp">
                <input
                  type="text"
                  id="user name"
                  name="user"
                  placeholder="Email or user name"
                  {...register("email", {
                    required: "User name or email is required",
                  })}
                />
                {errors?.email && (
                  <ErrorMessage
                    message={errors?.email?.message}
                    className="my-1"
                  />
                )}
              </div>
              <div className="password-container">
                <input
                  type={type}
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {type === "password" ? (
                  <i
                    id="toggle-password"
                    className="fa-solid fa-eye-slash "
                    onClick={() => setType("text")}
                  ></i>
                ) : (
                  <i
                    id="toggle-password"
                    className="fas fa-eye "
                    onclick="togglePassword()"
                    onClick={() => setType("password")}
                  />
                )}
                <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                  {errors?.password && (
                    <ErrorMessage
                      message={errors?.password?.message}
                      className="mb-0"
                    />
                  )}

                  <p className="forgot ms-auto cursor-pointer">
                    <a id="forgot" onClick={() => setStep(step + 1)}>
                      Fogot password?
                    </a>
                  </p>
                </div>
              </div>
              {loading ? (
                <ButtonWithSpin />
              ) : (
                <button className="action_btn">Login</button>
              )}
              <div className="no_reg">
                Not registered yet?{" "}
                <a
                  onClick={() => {
                    onHide();
                    navigate(pageRoutes.SIGN_UP);
                  }}
                  className="text-primary"
                >
                  Sign Up.
                </a>
              </div>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmitForgetPassword(onSubmit2)}>
            <div className="login_areee">
              <div className="gp">
                <input
                  type="text"
                  id="user name"
                  name="user"
                  placeholder="Enter your registered email"
                  {...resisterForgetPassword("email", {
                    required: "Email is required",
                  })}
                />
                {errorsForgetPassword?.email && (
                  <ErrorMessage
                    message={errorsForgetPassword?.email?.message}
                    className="my-1"
                  />
                )}
              </div>
              {loading ? (
                <ButtonWithSpin />
              ) : (
                <button className="action_btn">Get Reset Link</button>
              )}
              <div className="no_reg">
                <a href="#" id="back_login" onClick={() => setStep(step - 1)}>
                  Back to Login
                </a>
              </div>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(LoginModal);
