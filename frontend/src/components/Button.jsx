
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ children, onClick, type, variant }) => {
  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  variant: 'primary',
};

export default Button;
