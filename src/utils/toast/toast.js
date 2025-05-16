// utils/toastUtils.js
import { toast } from 'react-hot-toast';

let currentToastId = null;

export const showToast = (message, type = 'success', options = {}) => {
  // Dismiss previous toast if it exists
  if (currentToastId) {
    toast.dismiss(currentToastId);
    currentToastId = null;
  }

  // Show new toast and store its ID
  currentToastId = toast[type](message, {
    id: 'global-toast',
    duration: type === 'loading' ? Infinity : 3000,
    ...options,
  });
};

export const dismissToast = () => {
  if (currentToastId) {
    toast.dismiss(currentToastId);
    currentToastId = null;
  }
};
