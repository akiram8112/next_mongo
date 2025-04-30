import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, imageUrl: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (title && imageUrl) {
      onSubmit(title, imageUrl); // Call onSubmit to pass the form data to the parent
      setTitle(''); // Clear form inputs
      setImageUrl('');
      onClose(); // Close the modal after submitting
    } else {
      alert('Please fill in both fields!');
    }
  };

  if (!isOpen) return null; // If the modal is closed, don't render it

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{color:'black'}}>Add New Album</h2>
        <form>
          <div style={containerStyle}>
            <label style={labelStyle}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={containerStyle}>
            <label style={labelStyle}>Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={buttonContainerStyle}>
            <button type="button" onClick={handleSubmit} style={buttonStyle}>
              Add
            </button>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Simple styling for the modal
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  textAlign: 'center',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',            // Align children horizontally
  alignItems: 'center',       // Vertically center the children
  gap: '10px',                // Optional: space between label and input
};

const labelStyle: React.CSSProperties = {
  margin: 0,                  // Remove default margin
  fontWeight: 'bold',         // Optional: style the label
  minWidth: '80px',           // Optional: set a minimum width for label
  color: 'black'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0070f3',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#ccc',
  color: 'black',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Modal;