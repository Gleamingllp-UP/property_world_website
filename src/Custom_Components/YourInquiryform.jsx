import { useForm } from "react-hook-form";
import { initiateInquiryThunk } from "../features/inquiry/inquirySlice";
import { showToast } from "../utils/toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "./ErrorMessage";
import ButtonWithSpin from "./ButtonWithSpin";
const YourInquiryform = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading } = useSelector((store) => store?.enquiry);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(initiateInquiryThunk(data));
      if (initiateInquiryThunk.fulfilled.match(resultAction)) {
        showToast("Your Inquiry Form is Submited", "success");
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
              {/* Full Name */}
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="text"
                    id="full_name"
                    {...register("full_name", {
                      required: "Full Name is required",
                      minLength: {
                        value: 3,
                        message: "Full Name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Full Name must be less than 50 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                        message: "Full Name can only contain letters",
                      },
                    })}
                    placeholder="Full Name"
                  />
                  {errors?.full_name && (
                    <ErrorMessage message={errors?.full_name?.message} />
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Email"
                  />
                  {errors?.email && (
                    <ErrorMessage message={errors?.email?.message} />
                  )}
                </div>
              </div>

              {/* City and Postal Code */}
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="text"
                    id="city"
                    {...register("city", {
                      required: "City is required",
                      pattern: {
                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                        message: "City can only contain letters and spaces",
                      },
                      minLength: {
                        value: 2,
                        message: "City must be at least 2 characters",
                      },
                    })}
                    placeholder="City"
                  />
                  {errors?.city && (
                    <ErrorMessage message={errors?.city?.message} />
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    id="post_code"
                    {...register("postal_code", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^[0-9]{4,8}$/,
                        message: "Postal Code must be numeric (4–8 digits)",
                      },
                    })}
                    placeholder="Postal Code"
                  />
                  {errors?.postal_code && (
                    <ErrorMessage message={errors?.postal_code?.message} />
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="col-lg-4">
                <div className="form-group">
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Message must be less than 500 characters",
                      },
                    })}
                    placeholder="Write Your Message Here"
                  />
                  {errors?.message && (
                    <ErrorMessage message={errors?.message?.message} />
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-2">
                <div className="form_group1">
                  {isLoading ? (
                    <ButtonWithSpin />
                  ) : (
                    <input
                      type="submit"
                      className="action_btn"
                      defaultValue="Submit"
                    />
                  )}
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
