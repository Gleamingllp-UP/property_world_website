import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { initiateInquiryThunk } from "../../../features/inquiry/inquirySlice";
import { showToast } from "../../../utils/toast/toast";
import { ErrorMessage } from "../../../Custom_Components/ErrorMessage";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";

function QuickContactFormModal({ show, onHide }) {
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
        showToast("Your Free Property Valuation Form is Submited", "success");
        reset();
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Register.", "error");
    }
  };

  return (
    <Modal show={show} onHide={() => onHide()} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary fs-5 fw-bold">
          Get a Free Property Valuation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted small">
          Discover the true market value of your property with Truworth’s expert
          valuation tool. Simply provide your property details and get an
          instant estimate.
        </p>

        <div className="home_form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Full Name */}
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  id="full_name"
                  {...register("full_name", {
                    required: "Full Name is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                    maxLength: { value: 50, message: "Max 50 characters" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters allowed",
                    },
                  })}
                  placeholder="Full Name"
                  className="form-control"
                />
                {errors?.full_name && (
                  <ErrorMessage message={errors?.full_name?.message} />
                )}
              </div>

              {/* Email */}
              <div className="col-12 col-md-6 mb-3">
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
                  className="form-control"
                />
                {errors?.email && (
                  <ErrorMessage message={errors?.email?.message} />
                )}
              </div>

              {/* City */}
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  id="city"
                  {...register("city", {
                    required: "City is required",
                    minLength: { value: 2, message: "At least 2 characters" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters allowed",
                    },
                  })}
                  placeholder="City"
                  className="form-control"
                />
                {errors?.city && (
                  <ErrorMessage message={errors?.city?.message} />
                )}
              </div>

              {/* Postal Code */}
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="number"
                  id="postal_code"
                  {...register("postal_code", {
                    required: "Postal Code is required",
                    pattern: {
                      value: /^[0-9]{4,8}$/,
                      message: "4–8 digits",
                    },
                  })}
                  placeholder="Postal Code"
                  className="form-control"
                />
                {errors?.postal_code && (
                  <ErrorMessage message={errors?.postal_code?.message} />
                )}
              </div>

              {/* Message */}
              <div className="col-12 mb-3">
                <textarea
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Min 10 characters" },
                    maxLength: { value: 500, message: "Max 500 characters" },
                  })}
                  placeholder="Write your message here"
                  rows="4"
                  className="form-control"
                />
                {errors?.message && (
                  <ErrorMessage message={errors?.message?.message} />
                )}
              </div>

              {/* Submit Button */}
              <div className="col-12 text-end">
                {isLoading ? (
                  <ButtonWithSpin />
                ) : (
                  <button type="submit" className="btn btn-primary px-4">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(QuickContactFormModal);
