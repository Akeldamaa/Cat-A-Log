import PropTypes from "prop-types";

export function Button({ variant, children, ...props }) {
  const className = `btn ${variant}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
};
