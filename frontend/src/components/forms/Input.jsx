import PropTypes from "prop-types";
import "./Input.css";

export function Input({ className, id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className={`label form-label`}>
        {label}
      </label>
      <input className={`input ${className}`} {...props} id="" name="" />
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};
