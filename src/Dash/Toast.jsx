import { useEffect } from "react";
import PropTypes from "prop-types";

// Small message that closes itself after a few seconds.
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-50 px-4 py-2.5 text-xs font-medium rounded-xl bg-white text-zinc-950 shadow-xl"
    >
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
