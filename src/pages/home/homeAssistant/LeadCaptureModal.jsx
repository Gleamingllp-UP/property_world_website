import React, { useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { InputWithLabelForm } from "../../../Custom_Components/InputWithLabelForm";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addPropertiesSuggestionDetailsThunk,
  getProprtySuggestionThunk,
  updatePropertySuggestionThunk,
} from "../../../features/user/userSlice";
import { showToast } from "../../../utils/toast/toast";
function LeadCaptureModal({ show, onClose, language }) {
  const { propertySeggestionDetails, loading } = useSelector(
    (store) => store?.user
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      min_budget: "",
      max_budget: "",
    },
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isUpdate = Boolean(propertySeggestionDetails?._id);

  useEffect(() => {
    if(show){
      dispatch(getProprtySuggestionThunk());
    }
  }, [dispatch, show]);

  useEffect(() => {
    if (
      propertySeggestionDetails &&
      Object.keys(propertySeggestionDetails)?.length > 0
    ) {
      reset({
        name: propertySeggestionDetails?.name,
        email: propertySeggestionDetails?.email,
        phone_number: propertySeggestionDetails?.phone_number,
        min_budget: propertySeggestionDetails?.min_budget,
        max_budget: propertySeggestionDetails?.max_budget,
      });
    }
  }, [propertySeggestionDetails, reset]);

  const onSubmit = async (data) => {
    try {
      // Determine whether to add or update

      const resultAction = await dispatch(
        isUpdate
          ? updatePropertySuggestionThunk({
              id: propertySeggestionDetails._id,
              data,
            })
          : addPropertiesSuggestionDetailsThunk(data)
      );

      if (
        (isUpdate &&
          updatePropertySuggestionThunk.fulfilled.match(resultAction)) ||
        (!isUpdate &&
          addPropertiesSuggestionDetailsThunk.fulfilled.match(resultAction))
      ) {
        showToast(
          isUpdate
            ? "Your details have been updated successfully"
            : "Your details have been submitted successfully",
          "success"
        );
        onClose();
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to process your request.", "error");
    }
  };

  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="lead-capture-modal"
      style={{
        zIndex: "1057",
      }}
      contentClassName="custom-modal-content-lead"
    >
      <Modal.Header className="border-0 justify-content-center pb-0">
        <Modal.Title className="fw-semibold text-primary">
          {t(
            isUpdate ? "lead_capture.modal_title_update" : "lead_capture.title",
            {
              lng: language,
            }
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        <p className="text-muted mb-4 text-center">
          {t("lead_capture.description", { lng: language })}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabelForm
            control={control}
            name="name"
            label={t("lead_capture.fields.name", { lng: language })}
            placeholder={t("lead_capture.placeholders.name", { lng: language })}
            rules={{
              required: t("lead_capture.errors.name_required", {
                lng: language,
              }),
            }}
            error={errors?.name?.message}
          />

          <InputWithLabelForm
            control={control}
            name="email"
            label={t("lead_capture.fields.email", { lng: language })}
            type="email"
            placeholder={t("lead_capture.placeholders.email", {
              lng: language,
            })}
            rules={{
              required: t("lead_capture.errors.email_required", {
                lng: language,
              }),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("lead_capture.errors.email_invalid", {
                  lng: language,
                }),
              },
            }}
            error={errors?.email?.message}
          />

          <InputWithLabelForm
            control={control}
            name="phone_number"
            label={t("lead_capture.fields.phone", { lng: language })}
            placeholder={t("lead_capture.placeholders.phone", {
              lng: language,
            })}
            rules={{
              required: t("lead_capture.errors.phone_required", {
                lng: language,
              }),
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: t("lead_capture.errors.phone_invalid", {
                  lng: language,
                }),
              },
            }}
            error={errors?.phone?.message}
          />

          <InputWithLabelForm
            control={control}
            name="min_budget"
            label={t("lead_capture.fields.minimum_budget", { lng: language })}
            placeholder={t("lead_capture.placeholders.budget", {
              lng: language,
            })}
            rules={{}}
            error={errors.budget?.message}
          />
          <InputWithLabelForm
            control={control}
            name="max_budget"
            label={t("lead_capture.fields.maximum_budget", { lng: language })}
            placeholder={t("lead_capture.placeholders.budget", {
              lng: language,
            })}
            rules={{}}
            error={errors.budget?.message}
          />

          <div className="d-flex gap-2 mt-4">
            <Button
              variant="outline-secondary"
              className="w-50 rounded-pill"
              onClick={onClose}
              disabled={loading}
            >
              {t("lead_capture.buttons.skip", { lng: language })}
            </Button>
            <Button
              variant="primary"
              className="w-50 rounded-pill"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  {t(
                    isUpdate
                      ? "lead_capture.buttons.updating"
                      : "lead_capture.buttons.submitting",
                    { lng: language }
                  )}
                </>
              ) : (
                t(
                  isUpdate
                    ? "lead_capture.buttons.update"
                    : "lead_capture.buttons.submit",
                  { lng: language }
                )
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(LeadCaptureModal);
