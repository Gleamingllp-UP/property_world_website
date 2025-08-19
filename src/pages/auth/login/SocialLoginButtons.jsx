import React from "react";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { userSocialLoginThunk } from "../../../features/user/userSlice";
import { showToast } from "../../../utils/toast/toast";
import { pageRoutes } from "../../../router/pageRoutes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../signUp/socialSignUp/googleHandler";

const SocialLoginButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socialLogin = async () => {
    try {
       const result = await loginWithGoogle();
           if (
             result === null ||
             !result ||
             result === undefined ||
             !result.idToken
           ) {
             showToast("Google login failed or was cancelled.", "error");
             return;
           }
     
           const { idToken } = result;
     
      const data = {
        id_token: idToken,
      };
      const resultAction = await dispatch(userSocialLoginThunk(data));
      if (userSocialLoginThunk.fulfilled.match(resultAction)) {
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

  const socialButtons = [
    {
      name: "Facebook",
      icon: (
        <FaFacebookF
          size={25}
          style={{
            color: "#3b5998",
          }}
        />
      ),
      onClick: () => showToast("Facebook login is not added yet.", "error"),
    },
    {
      name: "Google",
      icon: <FcGoogle size={25} />,
      onClick: () => socialLogin(),
    },

    {
      name: "Apple",
      icon: (
        <FaApple
          size={25}
          style={{
            color: "#333333",
          }}
        />
      ),
      onClick: () => showToast("Apple ID login is not added yet.", "error"),
    },
  ];

  return (
    <div className="d-flex gap-4 justify-content-center">
      {socialButtons &&
        socialButtons?.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            className="btn social-btn d-flex align-items-center justify-content-center border shadow"
            onClick={btn.onClick}
            title={`Login with ${btn?.name}`}
          >
            {btn?.icon}
          </button>
        ))}
    </div>
  );
};

export default SocialLoginButtons;
