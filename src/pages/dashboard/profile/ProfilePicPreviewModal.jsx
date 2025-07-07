import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";
import {
  getUserDetailsThunk,
  updateProfilePictureThunk,
} from "../../../features/user/userSlice";
import { showToast } from "../../../utils/toast/toast";

function ProfilePicPreviewModal({
  preview,
  showPreview,
  setShowPreview,
  selectedFile,
}) {
  const { loading } = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  const handleUpdateProfilePic = async () => {
    const file = selectedFile;

    try {
      const formData = new FormData();
      formData.append("profile_picture", file);

      const resultAction = await dispatch(updateProfilePictureThunk(formData));
      if (updateProfilePictureThunk.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message, "success");
        dispatch(getUserDetailsThunk());
        setShowPreview(false);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to update.", "error");
    }
  };

  return (
    <Modal show={showPreview} onHide={() => setShowPreview(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile Picture Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={preview}
          alt="Profile Preview"
          className="img-fluid rounded"
          style={{ maxHeight: "400px", width: "100%" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
          {loading ? (
            <ButtonWithSpin />
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                handleUpdateProfilePic();
              }}
            >
              Update
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(ProfilePicPreviewModal);
