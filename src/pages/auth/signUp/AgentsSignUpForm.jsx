import React from "react";

import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { useForm } from "react-hook-form";
import { requiredSignUpFieldsForAgents } from "../../../utils/requiredFormFields/requiredSignUpFields";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import { useSelector } from "react-redux";

function AgentsSignUpForm() {
  const { selectedUserType } = useSelector((state) => state?.usersType);

  const { handleSubmit, control } = useForm();
  console.log(selectedUserType);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="agent_agencys">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
            <InputWithLabelForm
              control={control}
              name="trade_license"
              label="Trade License"
              rules={getValidationRules({
                type: "text",
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
                field?.key === "office_address" ? "col-lg-12" : "col-lg-6"
              }
            >
              {field.inputType === "text" && (
                <>
                  <InputWithLabelForm
                    control={control}
                    name={field?.key}
                    label={field?.label}
                    type={field?.type}
                    className="rounded-none h-10 w-full"
                    rules={getValidationRules({
                      label: field?.label,
                      type: field?.type,
                    })}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="col-lg-3">
          <div className="form_gp">
            <input type="submit" defaultValue="Submit" className="action_btn" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default React.memo(AgentsSignUpForm);
