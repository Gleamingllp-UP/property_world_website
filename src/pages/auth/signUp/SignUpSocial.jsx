import React, { useState } from "react";
import ManualSignUp from "./ManualSignUp";

function SignUpSocial() {
  const [step, setStep] = useState(1);
  return (
    <>
      {step === 1 && (
        <div className="">
          <div className="apple_face">
            <p>
              <b>Can create an account by using</b>
            </p>
            <hr />
            <a href="#">
              <i className="ri-facebook-line" /> Facebook
            </a>
            <a href="#">
              <i className="ri-mail-line" /> Google
            </a>
            <a href="#">
              <i className="ri-apple-line" /> Apple id
            </a>
            <a onClick={() => setStep(2)} id="mm_reg">
              <i className="ri-pencil-line" /> Manual Registration
            </a>
          </div>
        </div>
      )}
      {step === 2 && <ManualSignUp />}
    </>
  );
}

export default React.memo(SignUpSocial);
