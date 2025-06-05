import React, { useEffect } from "react";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toast/toast";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFormData,
  verifyCodeThunk,
} from "../../../features/user/userSlice";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";

function VerifyEmail({ setStep }) {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const { formData, isLoading } = useSelector((store) => store?.user);

  useEffect(() => {
    dispatch(getUserFormData());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: formData?.email,
        code: data?.code,
      };

      const resultAction = await dispatch(verifyCodeThunk(payload));
      if (verifyCodeThunk.fulfilled.match(resultAction)) {
        showToast("Email verified successfully!", "success");
        setTimeout(() => {
          setStep(3);
        }, 1000);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Verify Email.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6">
          <InputWithLabelForm
            control={control}
            name="code"
            label="Enter Code"
            rules={getValidationRules({
              type: "number",
              label: "Code *",
            })}
          />
        </div>
      </div>

      <div className="col-lg-3">
        <div className="form_gp">
          {isLoading ? (
            <ButtonWithSpin />
          ) : (
            <input type="submit" defaultValue="Submit" className="action_btn" />
          )}
        </div>
      </div>
    </form>
  );
}

export default React.memo(VerifyEmail);
