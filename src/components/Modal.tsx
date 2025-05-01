import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, imageUrl: string) => void;
  mode?: 'add' | 'edit';
  initialData?: {
    title: string;
    imageUrl: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, mode = 'add', initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setImageUrl(initialData.imageUrl);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (title && imageUrl) {
      onSubmit(title, imageUrl);
      setTitle('');
      setImageUrl('');
      onClose();
    } else {
      alert('Please fill in both fields!');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{color:'black'}}>{mode === 'add' ? 'Add New Album' : 'Edit Album'}</h2>
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
              {mode === 'add' ? 'Add' : 'Save'}
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
  color: 'black'
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
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