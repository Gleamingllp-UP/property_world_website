
export function ErrorMessage({ message, className = "" }) {
    if (!message) return null;
  
    return (
      <p className={`text-red-500 text-sm mb-2 font-medium ${className}`}>
        {message}
      </p>
    );
  }
  