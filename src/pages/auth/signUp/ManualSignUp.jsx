import React from "react";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import { requiredSignUpFieldsForManual } from "../../../utils/requiredFormFields/requiredManualSignUpFields";
import { useForm } from "react-hook-form";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { SelectWithLabelForm } from "../../../Custom_Components/SelectWithLabelForm";

function ManualSignUp() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {requiredSignUpFieldsForManual?.map((field, index) => (
            <div key={index} className={"col-lg-6"}>
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
                    options={[{ value: "971", label: "UAE" }]}
                  />
                </>
              )}
            </div>
          ))}

          <div className="col-lg-3">
            <div className="form_gp">
              <input
                type="submit"
                defaultValue="Submit"
                className="action_btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManualSignUp;
