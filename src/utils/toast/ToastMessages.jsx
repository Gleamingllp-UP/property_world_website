// utils/toastUtils.js
import { toast } from "react-hot-toast";

let currentToastId = null;

const dismissExisting = () => {
  if (currentToastId) {
    toast.dismiss(currentToastId);
    currentToastId = null;
  }
};

export const showInfoToast = (msg) => {
  dismissExisting();

  currentToastId = toast.custom((t) => (
    <div
      className={`bg-info text-white px-4 py-2 rounded shadow-sm ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      ℹ️ {msg}
    </div>
  ));
};

export const showWarningToast = (msg) => {
  dismissExisting();

  currentToastId = toast.custom((t) => (
    <div
      className={`bg-warning text-dark px-4 py-2 rounded shadow-sm ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      ⚠️ {msg}
    </div>
  ));
};

export const dismissToast = () => {
  dismissExisting();
};
