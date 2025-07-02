import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toast/toast";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFormData,
  logoutUser,
  updatePasswordThunk,
} from "../../../features/user/userSlice";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";

const UpdatePassword = () => {
  const { handleSubmit, control, watch, getValues } = useForm();
  const { loading } = useSelector((store) => store?.user);

  const navigate = useNavigate();

  const [confirmPassword, SetConfirmPassword] = useState(true);
  const [currentPassword, SetCurrentPassword] = useState(true);
  const [newPassword, SetNewPassword] = useState(true);

  const dispatch = useDispatch();
  const new_password = watch("new_password");

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

  const isPasswordValid = passwordCriteria.every((c) =>
    c.test(new_password || "")
  );

  const onSubmit = async (data) => {
    try {
      const payload = {
        current_password: data.current_password,
        new_password: data?.new_password,
      };
      const resultAction = await dispatch(updatePasswordThunk(payload));
      if (updatePasswordThunk.fulfilled.match(resultAction)) {
        showToast(
          "Password successfully Updated! Please login again.",
          "success"
        );
        dispatch(logoutUser());
        navigate(pageRoutes.HOME_PAGE);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Update Password.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="vh-100 d-flex align-items-start justify-content-center min-vh-100">
        <div
          className="mx-auto p-5 rounded-2 shadow-lg text-center"
          style={{
            maxWidth: "800px",
            backdropFilter: "blur(5px)",
          }}
        >
          <h4 className="card-title text-center mb-4">
            Keep Your Account Safe – Change Your Password
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Current Password */}
            <InputWithLabelForm
              control={control}
              name="current_password"
              label="Current Password *"
              type={currentPassword ? "password" : "text"}
              rightIcon={
                currentPassword ? (
                  <IoEyeOffSharp
                    className="cursor-pointer text-success"
                    onClick={() => SetCurrentPassword(!currentPassword)}
                  />
                ) : (
                  <MdRemoveRedEye
                    className="cursor-pointer text-success"
                    onClick={() => SetCurrentPassword(!currentPassword)}
                  />
                )
              }
              rules={{
                required: "Current password is required",
              }}
            />

            {/* New Password */}
            <InputWithLabelForm
              control={control}
              name="new_password"
              label="New Password *"
              type={newPassword ? "password" : "text"}
              rightIcon={
                newPassword ? (
                  <IoEyeOffSharp
                    className="cursor-pointer text-success"
                    onClick={() => SetNewPassword(!newPassword)}
                  />
                ) : (
                  <MdRemoveRedEye
                    className="cursor-pointer text-success"
                    onClick={() => SetNewPassword(!newPassword)}
                  />
                )
              }
              rules={{
                required: "New Password is required",
                validate: (value) => {
                  if (!isPasswordValid) return "Password is too weak";
                  if (value === getValues("current_password"))
                    return "New password must be different from current password";
                  return true;
                },
              }}
            />

            {/* Confirm Password */}
            <InputWithLabelForm
              control={control}
              name="confirmPassword"
              label="Confirm Password *"
              type={confirmPassword ? "password" : "text"}
              rightIcon={
                confirmPassword ? (
                  <IoEyeOffSharp
                    className="cursor-pointer text-success"
                    onClick={() => SetConfirmPassword(!confirmPassword)}
                  />
                ) : (
                  <MdRemoveRedEye
                    className="cursor-pointer text-success"
                    onClick={() => SetConfirmPassword(!confirmPassword)}
                  />
                )
              }
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === getValues("new_password") ||
                  "Passwords do not match",
              }}
            />

            {loading ? (
              <ButtonWithSpin />
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Update Password
              </button>
            )}
          </form>

          {new_password && (
            <ul className="list-unstyled mt-3">
              {passwordCriteria &&
                passwordCriteria?.map((c, i) => {
                  const passed = c.test(new_password);
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

export default React.memo(UpdatePassword);
