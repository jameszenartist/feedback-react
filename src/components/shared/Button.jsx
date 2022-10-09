import PropTypes from "prop-types";

function Button({ children, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn `}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  isDisabled: "false",
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
