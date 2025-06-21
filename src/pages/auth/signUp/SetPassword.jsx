import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toast/toast";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { CheckCircle, XCircle } from "lucide-react";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFormData,
  removeUserFormDataToken,
  setPasswordThunk,
} from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";

const SetPassword = ({ setStep }) => {
  const { handleSubmit, control, watch } = useForm();
  const { formData, loading } = useSelector((store) => store?.user);

  const [type, SetType] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch("password");

  useEffect(() => {
    dispatch(getUserFormData());
  }, [dispatch]);

  const passwordCriteria = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One digit", test: (pw) => /\d/.test(pw) },
    {
      label: "One special character",
      test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
  ];

  const isPasswordValid = passwordCriteria.every((c) => c.test(password || ""));

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: formData?.email,
        password: data?.password,
      };
      const resultAction = await dispatch(setPasswordThunk(payload));
      if (setPasswordThunk.fulfilled.match(resultAction)) {
        showToast(
          "Password successfully set! After Admin Approval You can login.",
          "success"
        );
        dispatch(removeUserFormDataToken());
        setTimeout(() => {
          setStep(1);
          navigate(pageRoutes?.HOME_PAGE);
        }, 1000);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Set Password.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-6">
          <h4 className="card-title text-center mb-4">
            Set your password to complete the registration.
          </h4>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputWithLabelForm
              control={control}
              name="password"
              label="New Password *"
              type={type ? "password" : "text"}
              rightIcon={
                type ? (
                  <IoEyeOffSharp
                    className="cursor-pointer text-success"
                    onClick={() => SetType(!type)}
                  />
                ) : (
                  <MdRemoveRedEye
                    className="cursor-pointer text-success"
                    onClick={() => SetType(!type)}
                  />
                )
              }
              rules={{
                required: "Password is required",
                validate: () => {
                  if (!isPasswordValid) return "Password is too weak";
                  return true;
                },
              }}
            />

            <InputWithLabelForm
              control={control}
              name="confirmPassword"
              label="Confirm Password *"
              type={type ? "password" : "text"}
              rightIcon={
                type ? (
                  <IoEyeOffSharp
                    className="cursor-pointer text-success"
                    onClick={() => SetType(!type)}
                  />
                ) : (
                  <MdRemoveRedEye
                    className="cursor-pointer text-success"
                    onClick={() => SetType(!type)}
                  />
                )
              }
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
            />
            {loading ? (
              <ButtonWithSpin />
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Set Password
              </button>
            )}
          </form>

          {/* Password Strength Indicators */}
          {password && (
            <ul className="list-unstyled mt-3">
              {passwordCriteria.map((c, i) => {
                const passed = c.test(password);
                return (
                  <li key={i} className="d-flex align-items-center mb-2">
                    {passed ? (
                      <CheckCircle size={18} className="me-2 text-success" />
                    ) : (
                      <XCircle size={18} className="me-2 text-danger" />
                    )}
                    <span className={passed ? "text-success" : "text-danger"}>
                      {c.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SetPassword);
