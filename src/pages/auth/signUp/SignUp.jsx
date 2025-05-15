import React, { useRef } from "react";
import SignUpBanner from "./SignUpBanner";
import SignUpTabs from "./SignUpTabs";

function SignUp() {
  const targetRef = useRef(null);

  return (
    <>
      <SignUpBanner scrollRef={targetRef} />
      <SignUpTabs innerRef={targetRef} />
    </>
  );
}

export default SignUp;
