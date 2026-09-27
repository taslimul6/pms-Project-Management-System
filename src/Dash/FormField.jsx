import PropTypes from "prop-types";

// Label + input slot + error message, shared by every form field.
const FormField = ({ id, label, error, children }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs font-medium text-zinc-300 mb-1"
    >
      {label} <span className="text-rose-400">*</span>
    </label>

    {children}

    <ErrorMessage id={`error-${id}`} message={error} />
  </div>
);

export const ErrorMessage = ({ id, message }) => {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-[11px] text-rose-400 mt-1">
      {message}
    </p>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default FormField;
