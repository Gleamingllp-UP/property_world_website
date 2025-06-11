import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { initiateGetInTouchThunk } from '../../features/getInTouch/getInTouchSlice';
import { showToast } from '../../utils/toast/toast';
import { ErrorMessage } from '../../Custom_Components/ErrorMessage';

const ContactGetIntouch = () => {
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
      const resultAction = await dispatch(initiateGetInTouchThunk(data));
      if (initiateGetInTouchThunk.fulfilled.match(resultAction)) {
        showToast("Your Get In Touch Form is Submitted", "success");
        reset();
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Register.", "error");
    }
  };

  return (
    <div className="col-lg-6 p-0 gey_color">
      <div className="contact_form">
        <h3>Get in touch</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fm_gp">
            <input
              type="text"
              className="box"
              placeholder="First Name*"
              {...register("full_name", {
                required: "Full Name is required",
                minLength: { value: 3, message: "At least 3 characters" },
                maxLength: { value: 50, message: "Less than 50 characters" },
                pattern: {
                  value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                  message: "Only letters allowed",
                },
              })}
            />
            {errors?.full_name && (
              <ErrorMessage message={errors.full_name.message} />
            )}
          </div>

          <div className="fm_gp">
            <input
              type="email"
              className="box"
              placeholder="Email*"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors?.email && (
              <ErrorMessage message={errors.email.message} />
            )}
          </div>

          <div className="fm_gp">
            <input
              type="number"
              className="box onlyInteger"
              maxLength={15}
              placeholder="Phone*"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{15}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors?.phone && (
              <ErrorMessage message={errors.phone.message} />
            )}
          </div>

          <div className="fm_gp">
            <input
              type="text"
              className="box"
              placeholder="Subject"
              {...register("subject", {
                required: "Subject is required",
                minLength: { value: 3, message: "At least 3 characters" },
                maxLength: { value: 50, message: "Less than 50 characters" },
                pattern: {
                  value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                  message: "Only letters allowed",
                },
              })}
            />
            {errors?.subject && (
              <ErrorMessage message={errors.subject.message} />
            )}
          </div>

          <div className="fm_gp">
            <textarea
              className="box2"
              placeholder="What’s on your mind?*"
              {...register("message", {
                required: "Message is required",
                minLength: { value: 3, message: "At least 3 characters" },
                maxLength: { value: 300, message: "Less than 300 characters" },
              })}
            />
            {errors?.message && (
              <ErrorMessage message={errors.message.message} />
            )}
          </div>

          <div className="mt-3">
            <button className="action_btn" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactGetIntouch;
