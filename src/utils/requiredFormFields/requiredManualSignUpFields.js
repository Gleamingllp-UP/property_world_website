export const requiredSignUpFieldsForManual = [
  {
    key: "first_name",
    label: "First Name *",
    type: "text",
    inputType: "text",
  },
  {
    key: "last_name",
    label: "Last Name *",
    type: "text",
    inputType: "text",
  },

  { key: "email", label: "Email *", type: "email", inputType: "text" },
  { key: "dob", label: "Date of birth *", type: "date", inputType: "date" },
  {
    key: "country_code",
    label: "Country Code *",
    type: "number",
    inputType: "select",
  },
  {
    key: "phone_number",
    label: "Contact Number *",
    type: "number",
    inputType: "text",
  },
  {
    key: "country_of_residance",
    label: "Country of Residence *",
    type: "text",
    inputType: "select",
  },
  {
    key: "is_accepted_privacy_and_policy",
    label: "Privacy Policy *",
    type: "checkbox",
    inputType: "checkbox",
  },
  {
    key: "is_accepted_terms_and_condition",
    label: "Terms and Conditions *",
    type: "checkbox",
    inputType: "checkbox",
  },
];
