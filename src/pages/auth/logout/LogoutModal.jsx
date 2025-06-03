import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { showToast } from "../../../utils/toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/user/userSlice";
import { Button, Spinner } from "react-bootstrap";

function LogoutModal({ show, onHide }) {
  const { loading } = useSelector((store) => store?.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        showToast("Logout Successfull!", "success");
        setTimeout(() => {
          onHide();
          navigate(pageRoutes.HOME_PAGE);
        }, 500);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to Logout.", "error");
    }
  };

  return (
    <Modal show={show} onHide={() => onHide()} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger fs-5 fw-bold">
          Log Out Confirmation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted small">Are you sure you want to Logout!</p>
      </Modal.Body>

      <Modal.Footer>
        {loading ? (
          <Button
            variant="secondary"
            disabled
            className="d-flex align-items-center gap-2"
          >
            <Spinner animation="border" size="sm" />
            Wait
          </Button>
        ) : (
          <>
            <Button variant="light" onClick={() => onHide()}>
              No
            </Button>
            <Button variant="danger" onClick={onSubmit}>
              Yes
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(LogoutModal);
