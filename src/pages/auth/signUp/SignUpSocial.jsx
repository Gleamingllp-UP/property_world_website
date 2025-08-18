import React, { useState } from "react";
import ManualSignUp from "./ManualSignUp";
import { loginWithGoogle } from "./socialSignUp/googleHandler";
import { showToast } from "../../../utils/toast/toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initiateSocialSignupThunk } from "../../../features/user/userSlice";
import { pageRoutes } from "../../../router/pageRoutes";

function SignUpSocial({ user_type }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socialSignUp = async () => {
    try {
      const result = await loginWithGoogle();
      if (!result) return;

      const { idToken } = result;

      const data = {
        id_token: idToken,
        user_type,
      };
      const resultAction = await dispatch(initiateSocialSignupThunk(data));
      if (initiateSocialSignupThunk.fulfilled.match(resultAction)) {
        showToast("Social Login Successfull!", "success");
        setTimeout(() => {
          navigate(pageRoutes.USER_DASHBOARD);
        }, 500);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {

      showToast(error?.message || "Failed to Login.", "error");
    }
  };
  return (
    <>
      {step === 1 && (
        <div className="">
          <div className="apple_face">
            <p>
              <b>Can create an account by using</b>
            </p>
            <hr />
            <a href="#">
              <i className="ri-facebook-line" /> Facebook
            </a>
            <a onClick={() => socialSignUp()}>
              <i className="ri-mail-line" /> Google
            </a>
            <a href="#">
              <i className="ri-apple-line" /> Apple id
            </a>
            <a onClick={() => setStep(2)} id="mm_reg">
              <i className="ri-pencil-line" /> Manual Registration
            </a>
          </div>
        </div>
      )}
      {step === 2 && <ManualSignUp />}
    </>
  );
}

export default React.memo(SignUpSocial);
