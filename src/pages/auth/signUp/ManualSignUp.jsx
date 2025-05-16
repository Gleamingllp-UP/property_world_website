import React, { useEffect, useState } from "react";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import { requiredSignUpFieldsForManual } from "../../../utils/requiredFormFields/requiredManualSignUpFields";
import { useForm } from "react-hook-form";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { SelectWithLabelForm } from "../../../Custom_Components/SelectWithLabelForm";
import { DatePickerWithLabelForm } from "../../../Custom_Components/DatePickerWithLabelForm";
import { CheckboxWithLabelForm } from "../../../Custom_Components/CheckboxWithLabelForm";
import { showToast } from "../../../utils/toast/toast";
import VerifyEmail from "./VerifyEmail";
import SetPassword from "./SetPassword";
import {
  getUserFormData,
  initiateSignupThunk,
} from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";
import { formatDate } from "../../../helper/formateDate/formatedDate";

function ManualSignUp() {
  const { handleSubmit, control, reset } = useForm();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store?.user);
  const { selectedUserType } = useSelector((state) => state?.usersType);
  const { formData } = useSelector((store) => store?.user);

  useEffect(() => {
    dispatch(getUserFormData());
  }, [dispatch]);

  useEffect(() => {
    if (formData) {
      const { user_type, ...newFormData } = formData;
      console.log(newFormData)
      reset({
        ...newFormData,
        dob:formatDate(newFormData?.dob,'dateHiphonYearStart')
      });
    }
  }, [formData, reset]);
  const onSubmit = async (data) => {
    try {
      const payload = {
        user_type: selectedUserType?._id,
        ...data,
      };
      const resultAction = await dispatch(initiateSignupThunk(payload));
      if (initiateSignupThunk.fulfilled.match(resultAction)) {
        localStorage.setItem("formData", JSON.stringify(payload));
        showToast("Please Verify Email", "success");
        setTimeout(() => {
          setStep(2);
        }, 1000);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Register.", "error");
    }
  };

  const countryOfResidanceOption = [
    { value: "UAE", label: "United Arab Emirates" },
  ];
  const countryCodeOption = [{ value: "971", label: "+971(UAE)" }];

  return (
    <div className="">
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit, (errors) => {
          console.error("Errors:", errors);
        })
        }>
          <div className="row">
            {requiredSignUpFieldsForManual?.map((field, index) => (
              <div
                key={index}
                className={
                  field?.inputType === "checkbox" ? "col-lg-12" : "col-lg-6"
                }
              >
                {field.inputType === "text" && (
                  <>
                    <InputWithLabelForm
                      control={control}
                      name={field?.key}
                      label={field?.label}
                      type={field?.type}
                      rules={getValidationRules({
                        label: field?.label,
                        type: field?.type,
                      })}
                    />
                  </>
                )}
                {field.inputType === "date" && (
                  <>
                    <DatePickerWithLabelForm
                      control={control}
                      name={field?.key}
                      label={field?.label}
                      type={field?.type}
                      rules={getValidationRules({
                        label: field?.label,
                        type: field?.type,
                      })}
                    />
                  </>
                )}
                {field.inputType === "checkbox" && (
                  <>
                    <CheckboxWithLabelForm
                      key={index}
                      name={field?.key}
                      label={field?.label}
                      control={control}
                      rules={{ required: `You must accept the ${field.label}` }}
                    />
                  </>
                )}
                {field.inputType === "select" && (
                  <>
                    <SelectWithLabelForm
                      control={control}
                      name={field?.key}
                      label={field?.label}
                      type={field?.type}
                      rules={getValidationRules({
                        label: field?.label,
                        type: field?.type,
                      })}
                      options={
                        field?.key === "country_of_residance"
                          ? countryOfResidanceOption
                          : field?.key === "country_code"
                          ? countryCodeOption
                          : [{ value: "0", label: "Options unavailable" }]
                      }
                    />
                  </>
                )}
              </div>
            ))}

            <div className="col-lg-3">
              <div className="form_gp">
                {isLoading ? (
                  <ButtonWithSpin />
                ) : (
                  <>
                    <input
                      type="submit"
                      defaultValue="Submit"
                      className="action_btn"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
      {step === 2 && <VerifyEmail setStep={setStep} />}
      {step === 3 && <SetPassword setStep={setStep} />}
    </div>
  );
}

export default ManualSignUp;
