import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { showToast } from "../../../../utils/toast/toast";

let isPopupOpen = false;

export const loginWithGoogle = async () => {
  if (isPopupOpen) {
    showToast("Google Sign-In or Sign-Up popup is already open!", "error");
    return null;
  }

  const provider = new GoogleAuthProvider();
  isPopupOpen = true;

  try {

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    return { idToken };
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      showToast("You closed the popup. Try again.", "error");
    } else if (error.code === "auth/cancelled-popup-request") {
      showToast("Another popup was already open. Try again.", "error");
    } else {
      showToast(error?.message || "Failed to Login.", "error");
    }
    return null; 
  } finally {
    isPopupOpen = false;
  }
};
