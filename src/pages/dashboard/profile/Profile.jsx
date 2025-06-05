import { useForm } from "react-hook-form";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import {
  countryCodeOption,
  countryOfResidanceOption,
} from "../../../utils/requiredFormFields/requiredproparty";
import { useDispatch, useSelector } from "react-redux";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { SelectWithLabelForm } from "../../../Custom_Components/SelectWithLabelForm";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";
import { requiredProfileFieldsForAgents } from "../../../utils/requiredFormFields/requireProfileFields";
import { useEffect, useState } from "react";
import { getUserDetailsThunk } from "../../../features/user/userSlice";

function Profile() {
  const [agentPhoto, setAgentPhoto] = useState("");
  const [agencyLogo, setAgencyLogo] = useState("");
  const [officeRegistrationNumber, setOfficeRegistrationNumber] = useState("");
  const [brokerLicenseNumber, setBrokerLicenseNumber] = useState("");

  const { handleSubmit, control, reset } = useForm();
  const { isLoading, userData } = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetailsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      let initialValues = {};

      if (userData?.agency_logo) {
        setAgencyLogo(userData?.agency_logo);
      }
      if (userData?.agent_photo) {
        setAgentPhoto(userData?.agent_photo);
      }
      if (userData?.broker_license_number) {
        setBrokerLicenseNumber(userData?.broker_license_number);
      }
      if (userData?.office_registration_number) {
        setOfficeRegistrationNumber(userData?.office_registration_number);
      }
      requiredProfileFieldsForAgents.forEach((field) => {
        initialValues[field.key] = userData[field.key] || "";
      });

      reset(initialValues);
    }
  }, [userData, reset]);

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
          {requiredProfileFieldsForAgents?.slice(1)?.map((field, index) => (
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
                    previewUrl={
                      field?.key === "agency_logo"
                        ? agencyLogo
                        : field?.key === "agent_photo"
                        ? agentPhoto
                        : field?.key === "office_registration_number"
                        ? officeRegistrationNumber
                        : field?.key === "broker_license_number"
                        ? brokerLicenseNumber
                        : null
                    }
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
                        field?.key === "office_address" ? "text2" : field?.type,
                      imageURL:
                        field?.key === "agency_logo"
                          ? agencyLogo
                          : field?.key === "agent_photo"
                          ? agentPhoto
                          : field?.key === "office_registration_number"
                          ? officeRegistrationNumber
                          : field?.key === "broker_license_number"
                          ? brokerLicenseNumber
                          : null,
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
                    placeholder={field?.key === "country_code" ? "Select" : ""}
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
    </div>
  );
}

export default Profile;
