import { useForm } from "react-hook-form";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import {
  countryCodeOption,
  countryOfResidanceOption,
  languages,
} from "../../../utils/requiredFormFields/requiredproparty";
import { useDispatch, useSelector } from "react-redux";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { SelectWithLabelForm } from "../../../Custom_Components/SelectWithLabelForm";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";
import {
  requiredProfileFieldsForAgents,
  requiredProfileFieldsForIndividual,
} from "../../../utils/requiredFormFields/requireProfileFields";
import { useEffect, useState } from "react";
import {
  getUserDetailsThunk,
  sendOtpToEmailThunk,
  sendOtpToPhoneNumberThunk,
  updateUserDetailsThunk,
  verifyOtpForEmailThunk,
  verifyOtpForPhoneNumberThunk,
} from "../../../features/user/userSlice";
import { MultiSelectWithLabelForm } from "../../../Custom_Components/MultiSelectWithLabelForm";
import { TextAreaWithLabelForm } from "../../../Custom_Components/TextAreaWithLabelForm";
import { buildFormDataFromFields } from "../../../helper/function/buildFormDataFromFields";
import { showToast } from "../../../utils/toast/toast";
import { getAllActiveLocationThunk } from "../../../features/activeData/activeDataSlice";
import VerifyOtpModal from "./VerifyOtpModal";
import VerifyOtpForEmailModal from "./VerifyOtpForEmailModal";

function Profile() {
  const [agentPhoto, setAgentPhoto] = useState("");
  const [agencyLogo, setAgencyLogo] = useState("");
  const [officeRegistrationNumber, setOfficeRegistrationNumber] = useState("");
  const [brokerLicenseNumber, setBrokerLicenseNumber] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  const [kycForm, setKycForm] = useState("");
  const [titleDeed, setTitleDeed] = useState("");
  const [eidOrPassport, setEidOrPassport] = useState("");
  const [agreementOrNoc, setAgreementOrNoc] = useState("");

  const { handleSubmit, control, reset } = useForm();
  const { loading, userData, isEmailVerifying, isPhoneVerifying } = useSelector(
    (store) => store?.user
  );
  const { location } = useSelector((store) => store?.activeData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetailsThunk());
    dispatch(getAllActiveLocationThunk());
  }, [dispatch]);

  const locationData = location?.map((loca) => {
    return {
      value: loca?._id,
      label: loca?.name,
    };
  });
  const languagesData = languages?.map((language) => {
    return {
      value: language?.toLocaleLowerCase(),
      label: language,
    };
  });
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      let initialValues = {};

      //Agent
      if (userData?.user_type?.name === "Agent") {
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
        requiredProfileFieldsForAgents?.forEach((field) => {
          initialValues[field.key] = userData[field.key] || "";
        });
      }

      //Individual
      if (userData?.user_type?.name === "Individual") {
        if (userData?.kyc_form) {
          setKycForm(userData?.kyc_form);
        }
        if (userData?.title_deed) {
          setTitleDeed(userData?.title_deed);
        }
        if (userData?.eid_or_passport) {
          setEidOrPassport(userData?.eid_or_passport);
        }
        if (userData?.agreement_noc) {
          setAgreementOrNoc(userData?.agreement_noc);
        }
        requiredProfileFieldsForIndividual?.forEach((field) => {
          initialValues[field.key] = userData[field.key] || "";
        });
      }

      reset(initialValues);
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    // console.log(data);
    const id = userData?._id;
    let formData;
    if (userData?.user_type?.name === "Agent") {
      formData = buildFormDataFromFields(data, requiredProfileFieldsForAgents);
    }
    if (userData?.user_type?.name === "Individual") {
      formData = buildFormDataFromFields(
        data,
        requiredProfileFieldsForIndividual
      );
    }

    try {
      const resultAction = await dispatch(
        updateUserDetailsThunk({ id, formData })
      );
      if (updateUserDetailsThunk.fulfilled.match(resultAction)) {
        await reset();
        showToast("Profile Updated Successfull!", "success");
        dispatch(getUserDetailsThunk());
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to update profile.", "error");
    }
  };

  const handleSendOTPtoPhone = async () => {
    try {
      const phone_number = userData?.phone_number;
      const resultAction = await dispatch(
        sendOtpToPhoneNumberThunk({ phone_number })
      );
      if (sendOtpToPhoneNumberThunk.fulfilled.match(resultAction)) {
        showToast(resultAction?.payload?.message, "success");
        setModalShow(true);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to send.", "error");
    }
  };

  const handleSendOTPtoEmail = async () => {
    try {
      const email = userData?.email;
      const resultAction = await dispatch(sendOtpToEmailThunk({ email }));
      if (sendOtpToEmailThunk.fulfilled.match(resultAction)) {
        showToast(resultAction?.payload?.message, "success");
        setModalShow2(true);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to send.", "error");
    }
  };

  const handleVerifyOTPforPhone = async (code) => {
    try {
      const phone_number = userData?.phone_number;
      const resultAction = await dispatch(
        verifyOtpForPhoneNumberThunk({ phone_number, code })
      );
      if (verifyOtpForPhoneNumberThunk.fulfilled.match(resultAction)) {
        dispatch(getUserDetailsThunk());
        showToast(resultAction?.payload?.message, "success");
        setModalShow(false);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to verify.", "error");
    }
  };

  const handleVerifyOTPforEmail = async (code) => {
    try {
      const email = userData?.email;
      const resultAction = await dispatch(
        verifyOtpForEmailThunk({ email, code })
      );
      if (verifyOtpForEmailThunk.fulfilled.match(resultAction)) {
        dispatch(getUserDetailsThunk());
        showToast(resultAction?.payload?.message, "success");
        setModalShow2(false);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to verify.", "error");
    }
  };
  return (
    <div className="agent_agencys mt-5">
      {userData?.user_type?.name === "Individual" && (
        <>
          <form
            onSubmit={handleSubmit(onSubmit, (errors) => {
              console.error("Errors:", errors);
            })}
          >
            <div className="row">
              {requiredProfileFieldsForIndividual?.map((field, index) => (
                <div
                  key={index}
                  className={
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
                        accept="image/*,.pdf"
                        className={`rounded-none h-10 w-full ${
                          field?.key === "country_code"
                            ? "col-span-2"
                            : field?.key === "phone_number"
                            ? "col-span-4"
                            : ""
                        }`}
                        rightIcon={
                          field?.key === "phone_number" &&
                          !userData?.is_phone_verified ? (
                            isPhoneVerifying ? (
                              <div
                                className="spinner-border"
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  borderWidth: "2px",
                                }}
                                role="status"
                              ></div>
                            ) : (
                              <button
                                type="button"
                                className="text-success cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSendOTPtoPhone();
                                }}
                              >
                                Verify
                              </button>
                            )
                          ) : field?.key === "email" &&
                            !userData?.is_email_verified ? (
                            isEmailVerifying ? (
                              <div
                                className="spinner-border"
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  borderWidth: "2px",
                                }}
                                role="status"
                              ></div>
                            ) : (
                              <button
                                type="button"
                                className="text-success cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSendOTPtoEmail();
                                }}
                              >
                                Verify
                              </button>
                            )
                          ) : null
                        }
                        previewUrl={
                          field?.key === "kyc_form"
                            ? kycForm
                            : field?.key === "title_deed"
                            ? titleDeed
                            : field?.key === "eid_or_passport"
                            ? eidOrPassport
                            : field?.key === "agreement_noc"
                            ? agreementOrNoc
                            : null
                        }
                        rules={getValidationRules({
                          label: field?.label,
                          type: field?.type,
                          filetype: ["image", "pdf"],
                          imageURL:
                            field?.key === "kyc_form"
                              ? kycForm
                              : field?.key === "title_deed"
                              ? titleDeed
                              : field?.key === "eid_or_passport"
                              ? eidOrPassport
                              : field?.key === "agreement_noc"
                              ? agreementOrNoc
                              : null,
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

                  {field?.inputType === "textarea" && (
                    <TextAreaWithLabelForm
                      control={control}
                      name={field?.key}
                      label={field?.label}
                      type={field?.type}
                      rules={getValidationRules({
                        label: field?.label,
                        type: "shortDescription",
                      })}
                    />
                  )}

                  {field?.inputType === "select" && (
                    <>
                      {!field?.isMulti && (
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
                              : [{ value: "ttt", label: "Options unavailable" }]
                          }
                        />
                      )}
                      {field?.isMulti && (
                        <MultiSelectWithLabelForm
                          control={control}
                          name={field?.key}
                          label={field?.label}
                          type={field?.type}
                          rules={getValidationRules({
                            label: field?.label,
                            type: field?.type,
                          })}
                          options={
                            field?.key === "languages"
                              ? languagesData
                              : field?.key === "service_areas"
                              ? locationData
                              : [
                                  {
                                    value: "",
                                    label: "Options unavailable",
                                  },
                                ]
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              ))}

              <div className="col-lg-3">
                <div className="form_gp">
                  {loading ? (
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
        </>
      )}

      {userData?.user_type?.name === "Agent" && (
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
                      rightIcon={
                        field?.key === "phone_number" &&
                        !userData?.is_phone_verified ? (
                          isPhoneVerifying ? (
                            <div
                              className="spinner-border"
                              style={{
                                height: "20px",
                                width: "20px",
                                borderWidth: "2px",
                              }}
                              role="status"
                            ></div>
                          ) : (
                            <button
                              type="button"
                              className="text-success cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSendOTPtoPhone();
                              }}
                            >
                              Verify
                            </button>
                          )
                        ) : field?.key === "email" &&
                          !userData?.is_email_verified ? (
                          isEmailVerifying ? (
                            <div
                              className="spinner-border"
                              style={{
                                height: "20px",
                                width: "20px",
                                borderWidth: "2px",
                              }}
                              role="status"
                            ></div>
                          ) : (
                            <button
                              type="button"
                              className="text-success cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSendOTPtoEmail();
                              }}
                            >
                              Verify
                            </button>
                          )
                        ) : null
                      }
                      rules={getValidationRules({
                        label: field?.label,
                        type:
                          field?.key === "office_address"
                            ? "text2"
                            : field?.type,
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
                {field?.inputType === "textarea" && (
                  <TextAreaWithLabelForm
                    control={control}
                    name={field?.key}
                    label={field?.label}
                    type={field?.type}
                    rules={getValidationRules({
                      label: field?.label,
                      type: "shortDescription",
                    })}
                  />
                )}

                {field?.inputType === "select" && (
                  <>
                    {!field?.isMulti && (
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
                            : [{ value: "ttt", label: "Options unavailable" }]
                        }
                      />
                    )}
                    {field?.isMulti && (
                      <MultiSelectWithLabelForm
                        control={control}
                        name={field?.key}
                        label={field?.label}
                        type={field?.type}
                        rules={getValidationRules({
                          label: field?.label,
                          type: field?.type,
                        })}
                        options={
                          field?.key === "languages"
                            ? languagesData
                            : field?.key === "service_areas"
                            ? locationData
                            : [
                                {
                                  value: "",
                                  label: "Options unavailable",
                                },
                              ]
                        }
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="col-lg-3">
            <div className="form_gp">
              {loading ? (
                <ButtonWithSpin />
              ) : (
                <input
                  type="submit"
                  defaultValue="Submit"
                  className="rounded-5 action_btn"
                />
              )}
            </div>
          </div>
        </form>
      )}

      <VerifyOtpModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onVerify={(otp) => {
          handleVerifyOTPforPhone(otp);
        }}
      />
      <VerifyOtpForEmailModal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        onVerify={(otp) => {
          handleVerifyOTPforEmail(otp);
        }}
      />
    </div>
  );
}

export default Profile;
