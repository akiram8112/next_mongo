import React from 'react';

// Define the types for the props
interface ButtonProps {
  label: string; // The text that will be displayed on the button
  onClick: () => void; // The callback function when the button is clicked
  type?: 'button' | 'submit' | 'reset'; // Optional prop for button type (default is 'button')
  disabled?: boolean; // Optional prop to disable the button
  style?: React.CSSProperties; // Optional inline styles
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', disabled = false, style }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style}>
      {label}
    </button>
  );
};

export default Button;