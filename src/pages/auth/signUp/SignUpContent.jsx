import React from "react";
import AgentsSignUpForm from "./AgentsSignUpForm";
import SignUpSocial from "./SignUpSocial";
import { useSelector } from "react-redux";

function SignUpContent({ user_type_id, name }) {
  const { selectedUserType } = useSelector((state) => state?.usersType);

  const currentName = name?.toLowerCase();
  const selectedName = selectedUserType?.name?.toLowerCase();

  if (currentName !== selectedName && user_type_id !== selectedUserType?._id)
    return null;

  const formComponents = {
    agent: <AgentsSignUpForm />,
    individual: <SignUpSocial />,
  };

  return (
    formComponents?.[currentName] || (
      <div className="alert alert-warning text-center mt-4" role="alert">
        <strong>Notice:</strong> Please select a valid user type to continue.
      </div>
    )
  );
}

export default React.memo(SignUpContent);
