export function ErrorMessage({ message, className = "" }) {
  if (!message) return null;

  return (
    <p className={`text-danger small fw-medium mb-2 ${className}`}>
      {message}
    </p>
  );
}
