// components/Header.tsx
import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { useRouter } from 'next/router';

interface HeaderProps {
    title: string;
  }
  interface Album {
    _id: string;
    id: string;
    title: string;
    image: string;
    createdAt: string;
  }

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAlbum = async (title: string, imageUrl: string) => {
    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add album');
      }

      const data = await response.json();
      alert('Album added successfully!');
      router.reload(); // Refresh the page to show the new album
    } catch (error) {
      console.error('Error adding album:', error);
      alert('Failed to add album. Please try again.');
    }
  };
  return (
    <header style={headerStyle}>
      <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1>{title}</h1>
          </div>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
            <li>
              <Button label="Add Album" onClick={openModal} style={buttonStyle} />
            </li>
            
          </ul>
        </div>
      </nav>
      <Modal 
    isOpen={isModalOpen} 
    onClose={closeModal} 
    onSubmit={handleAddAlbum} 
  />
    </header>
    
  );
};
const headerStyle: React.CSSProperties = {
  position: 'fixed',  // Fixes the header to the top of the screen
  top: 0,             // Ensures it's at the very top
  left: 0,            // Aligns it to the left edge
  width: '100%',      // Full width of the screen
  backgroundColor: '#333',  // Your preferred background color
  color: '#fff',      // Text color
  padding: '10px 20px', // Adjust padding as needed
  zIndex: 1000,       // Ensures the header stays on top of other content
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Optional: Adds a shadow for separation
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

export default Header;
