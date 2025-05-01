// pages/index.tsx

import React from 'react';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

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

  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setIsEditModalOpen(true);
  };

  const handleUpdateAlbum = async (title: string, imageUrl: string) => {
    if (!editingAlbum) return;

    try {
      const response = await fetch(`/api/albums/${editingAlbum._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update album');
      }

      const updatedAlbum = await response.json();
      setAlbums(albums.map(album => 
        album._id === editingAlbum._id ? { ...album, title, image: imageUrl } : album
      ));
      setIsEditModalOpen(false);
      setEditingAlbum(null);
      alert('Album updated successfully!');
    } catch (error) {
      console.error('Error updating album:', error);
      alert('Failed to update album. Please try again.');
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/albums/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (response.ok) {
        // Remove the deleted album from the state
        setAlbums(albums.filter(album => album._id !== id));
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Failed to delete album');
    }
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
                _id={album._id} 
                // id={album.id}             
                title={album.title}
                // userId={album.userId}
                image={album.image}
                createdAt={album.createdAt}
                onEdit={() => handleEdit(album)}
                onDelete={() => handleDelete(album._id)}
              />
            ))}
          </AlbumList>
        </div>
      </main>
      <Modal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAlbum(null);
        }}
        onSubmit={handleUpdateAlbum}
        mode="edit"
        initialData={editingAlbum ? {
          title: editingAlbum.title,
          imageUrl: editingAlbum.image
        } : undefined}
      />
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
