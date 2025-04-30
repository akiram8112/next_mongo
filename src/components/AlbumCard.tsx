// components/AlbumCard.tsx
import React, {useState} from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface AlbumCardProps {
  _id: string;
  // id : string;  
  title: string;
  image: string;
  createdAt: string;
  onEdit?: () => void; // Optional edit callback
  onDelete?: (id: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ _id, title,  image, createdAt, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this album?');
    if (confirmation) {
      try {
        const response = await fetch(`/api/albums/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          // Optionally, remove the card from the UI after deletion
          router.reload(); // Refresh the page to update the album list
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error('Error deleting album:', error);
        alert('Failed to delete album');
      }
    }
  };
  return (
    <div style={cardStyle} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <div style={{ width: '100%', height: '300px', position: 'relative' }} >
            <Image
                src={image}              
                alt={`Cover of ${title}`}
                layout="fill"  // This makes the image fill the container
                objectFit="cover" // Ensures the image is cropped to fill its container
                loading="lazy" // This ensures lazy loading
            />
        </div>
        
      <div style={textContainerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {/* <p style={artistStyle}>{artist}</p> */}
        <p style={releaseDateStyle}>Released: {createdAt}</p>
      </div>
      {isHovered && (
        <div style={iconContainerStyle}>
          {onEdit && (
            <FaEdit style={iconStyle} onClick={onEdit} />
          )}          
          <FaTrash style={iconStyle} onClick={() => handleDelete(_id)} />          
        </div>
      )}
    </div>
  );
};

// Simple inline styles for the card
const cardStyle: React.CSSProperties = {
    width: '20%', // Adjust the card width for multiple columns (e.g., 5 columns)
    margin: '10px',
    textAlign: 'center',
    position: 'relative', // Ensure the image inside uses 'position: absolute' correctly
};

// const imageStyle = {
//   width: '100%',
//   height: 'auto',
// };

const textContainerStyle = {
  padding: '15px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

// const artistStyle = {
//   fontSize: '14px',
//   color: '#555',
//   marginBottom: '10px',
// };

const releaseDateStyle = {
  fontSize: '12px',
  color: '#777',
};

const iconContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  gap: '15px', // Space between icons
  visibility: 'visible',
};

// Style for individual icons
const iconStyle: React.CSSProperties = {
  fontSize: '50px',
  color: '#fff',
  cursor: 'pointer',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better visibility
  padding: '8px',
  borderRadius: '50%',
  transition: 'all 0.3s ease', // Adds a smooth transition effect
};

// Optional: Style for the icons when hovered (hover effect)
const iconHoverStyle: React.CSSProperties = {
  transform: 'scale(1.2)', // Slightly enlarge icon on hover
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Change background color on hover
};


export default AlbumCard;
