import React, { useEffect, useState } from "react";

import { InputWithLabelForm } from "../../../../Custom_Components/InputWithLabelForm";
import { useForm } from "react-hook-form";
import { requiredSignUpFieldsForAgents } from "../../../../utils/requiredFormFields/requiredSignUpFields";
import { getValidationRules } from "../../../../helper/function/getValidationRules";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxWithLabelForm } from "../../../../Custom_Components/CheckboxWithLabelForm";
import { SelectWithLabelForm } from "../../../../Custom_Components/SelectWithLabelForm";
import VerifyEmail from "../VerifyEmail";
import SetPassword from "../SetPassword";
import {
  getUserFormData,
  initiateSignupThunk,
} from "../../../../features/user/userSlice";
import { formatDate } from "../../../../helper/formateDate/formatedDate";
import { showToast } from "../../../../utils/toast/toast";
import ButtonWithSpin from "../../../../Custom_Components/ButtonWithSpin";

function AgentsSignUpForm() {
  const { handleSubmit, control, reset } = useForm();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { isLoading, formData } = useSelector((store) => store?.user);
  const { selectedUserType } = useSelector((state) => state?.usersType);

  useEffect(() => {
    dispatch(getUserFormData());
  }, [dispatch]);

  useEffect(() => {
    if (formData) {
      const { user_type, ...newFormData } = formData;
      reset({
        ...newFormData,
        dob: formatDate(newFormData?.dob, "dateHiphonYearStart"),
      });
    }
  }, [formData, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        user_type: selectedUserType?._id,
        ...data,
      };

      const formDataSignUp = new FormData();

      for (const key in payload) {
        const value = payload[key];

        if (value instanceof FileList && value.length > 0) {
          formDataSignUp.append(key, value[0]);
        } else {
          formDataSignUp.append(key, value);
        }
      }

      const resultAction = await dispatch(initiateSignupThunk(formDataSignUp));
      if (initiateSignupThunk.fulfilled.match(resultAction)) {
        localStorage.setItem("formData", JSON.stringify(payload));
        showToast(
          "Please verify your e-mail ID by entering the code you received on your mail ID. ",
          "success"
        );
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
    <div className="agent_agencys">
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <InputWithLabelForm
                control={control}
                name="trade_license"
                label="Trade License *"
                rules={getValidationRules({
                  type: "text2",
                  label: "Trade License",
                })}
              />
            </div>
          </div>
          <div className="row">
            <p className="mb-5">Company Details</p>
            {requiredSignUpFieldsForAgents?.slice(1)?.map((field, index) => (
              <div
                key={index}
                className={
                  field?.key === "office_address" ||
                  field?.inputType === "checkbox"
                    ? "col-lg-12"
                    : field?.key === "country_code"
                    ? "col-lg-2"
                    : field?.key === "phone_number"
                    ? "col-lg-4"
                    : "col-lg-6"
                }
              >
                {field.inputType === "text" && (
                  <>
                    <InputWithLabelForm
                      control={control}
                      name={field?.key}
                      label={field?.label}
                      type={field?.type}
                      className={`rounded-none h-10 w-full ${
                        field?.key === "country_code"
                          ? "col-span-2"
                          : field?.key === "phone_number"
                          ? "col-span-4"
                          : ""
                      }`}
                      rules={getValidationRules({
                        label: field?.label,
                        type:
                          field?.key === "office_address"
                            ? "text2"
                            : field?.type,
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
                      rules={{
                        required: `You must accept the ${field?.label
                          ?.replace(/\*/g, "")
                          .trim()}`,
                      }}
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
                      placeholder={
                        field?.key === "country_code" ? "Select" : ""
                      }
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
          </div>
          <div className="col-lg-3">
            <div className="form_gp">
              {isLoading ? (
                <ButtonWithSpin />
              ) : (
                <input
                  type="submit"
                  defaultValue="Submit"
                  className="action_btn"
                />
              )}
            </div>
          </div>
        </form>
      )}

      {step === 2 && <VerifyEmail setStep={setStep} />}
      {step === 3 && <SetPassword setStep={setStep} />}
    </div>
  );
}

export default React.memo(AgentsSignUpForm);
