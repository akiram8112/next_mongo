// components/AlbumCard.tsx
import React from 'react';
import Image from 'next/image';

interface AlbumCardProps {
  _id: string;
  id : string;  
  title: string;
  image: string;
  createdAt: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({_id, id, title,  image, createdAt }) => {
  return (
    <div style={cardStyle}>
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

const imageStyle = {
  width: '100%',
  height: 'auto',
};

const textContainerStyle = {
  padding: '15px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const artistStyle = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '10px',
};

const releaseDateStyle = {
  fontSize: '12px',
  color: '#777',
};

export default AlbumCard;
