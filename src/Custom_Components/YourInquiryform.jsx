import React from "react";
import { useForm } from "react-hook-form";
import { initiateInquiryThunk } from "../features/inquiry/inquirySlice";
import { showToast } from "../utils/toast/toast";
import { useDispatch } from "react-redux";
const YourInquiryform = () => {
  const { handleSubmit, reset, register } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(initiateInquiryThunk(data));
      if (initiateInquiryThunk.fulfilled.match(resultAction)) {
        showToast("Your Form Is Submited", "success");
        reset();
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Register.", "error");
    }
  };

  return (
    <>
      <div className="serb_gude">
        <div className="home_form container">
          <h2>Submit Your Inquiry</h2>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    defaultValue=""
                    {...register("full_name")}
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    defaultValue=""
                    {...register("email")}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    defaultValue=""
                    {...register("city")}
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="post_code"
                    name="post_code"
                    {...register("postal_code")}
                    defaultValue=""
                    placeholder="Post Code"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <textarea
                    type="text"
                    id="message"
                    {...register("message")}
                    name="message"
                    placeholder="Write Your Message Here"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-2">
                <div className="form_group1">
                  <input
                    type="submit"
                    className="action_btn"
                    defaultValue="Submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default YourInquiryform;
