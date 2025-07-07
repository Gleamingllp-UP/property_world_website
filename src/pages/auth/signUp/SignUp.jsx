import React, { useEffect, useRef } from "react";
import SignUpBanner from "./SignUpBanner";
import SignUpTabs from "./SignUpTabs";

function SignUp() {
  const targetRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SignUpBanner scrollRef={targetRef} />
      <SignUpTabs innerRef={targetRef} />
    </>
  );
}

export default SignUp;
