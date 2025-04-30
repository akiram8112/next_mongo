// pages/index.tsx

import React from 'react';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface Album {
  _id: string;
  // id : string;
  userId: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const AlbumList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: '20px',

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Home: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums', {method: 'GET'});
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: string) => {
    console.log("Editing album with ID:", id);
    // Implement your edit logic here
  };
  
  const handleDelete = (id: string) => {
    console.log("Deleting album with ID:", id);
    // Implement your delete logic here
  };
  return (
    <div>
      <Header title="Album Card" />
      <main>
        <div style={containerStyle}>
          <h1>Album Showcase</h1>
          <AlbumList style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {albums.map((album) => (
              <AlbumCard
                key={album._id}  
                _id= {album._id} 
                // id={album.id}             
                title={album.title}
                // userId={album.userId}
                image={album.image}
                createdAt={album.createdAt}
                onEdit={() => handleEdit(album._id)}
                onDelete={() => handleDelete(album._id)}
              />
            ))}
          </AlbumList>
        </div>
      </main>
    </div>
  );
};

// Simple inline styles for layout
const containerStyle: React.CSSProperties= {
  padding: '20px',
  textAlign: 'center',
  marginTop: '7rem'
};



export default Home;
