import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { closeLoginPrompt } from "../../../features/user/userSlice";

const LoginPromptModal = ({ openLogin }) => {
  const dispatch = useDispatch();
  const { loginPromptOpen: show, loginPromptText } = useSelector(
    (state) => state?.user
  );

  const handleClose = () => dispatch(closeLoginPrompt());
  const handleLogin = () => {
    dispatch(closeLoginPrompt());
    openLogin();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger fs-5 fw-bold">
          Login Required
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted small mb-0">
          {loginPromptText
            ? loginPromptText
            : "Log in to your account to save properties to your favourites."}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginPromptModal;
