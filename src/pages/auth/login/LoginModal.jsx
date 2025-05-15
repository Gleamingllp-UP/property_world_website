import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";

function LoginModal({ show, onHide }) {
  const [type, setType] = useState("password");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
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
          <div className="login_areee step1">
            <div className="gp">
              <input
                type="text"
                id="user name"
                name="user"
                placeholder="Email or user name"
              />
            </div>
            <div className="password-container">
              <input
                type={type}
                id="password"
                name="password"
                placeholder="Password"
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
            </div>
            <p className="forgot">
              <a id="forgot" onClick={() => setStep(step + 1)}>
                Fogot password?
              </a>
            </p>
            <button className="action_btn">Login</button>
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
        )}
        {step === 2 && (
          <div className="login_areee">
            <div className="gp">
              <input
                type="text"
                id="user name"
                name="user"
                placeholder="Enter Your Registered Email id"
              />
            </div>
            <button className="action_btn">Get New Password</button>
            <div className="no_reg">
              <a href="#" id="back_login" onClick={() => setStep(step - 1)}>
                Back to Login
              </a>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(LoginModal);
