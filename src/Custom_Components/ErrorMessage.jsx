export function ErrorMessage({ message, className = "" }) {
  if (!message) return null;

  return (
    <p className={`text-danger small fw-medium  ${className || 'mb-2'}`}>
      {message}
    </p>
  );
}
