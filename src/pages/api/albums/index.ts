import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';

// interface Album {
//   _id: string;
//   id : string;
//   userId: string;
//   title: string;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const albums = await db
        .collection('album')
        .find({})
        .toArray();

      res.status(200).json(albums);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch albums' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, image } = req.body;

      if (!title || !image) {
        return res.status(400).json({ error: 'Title and image are required' });
      }

      const newAlbum = {
        title,
        image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await db.collection('album').insertOne(newAlbum);
      
      res.status(201).json({ 
        message: 'Album created successfully',
        album: { ...newAlbum, _id: result.insertedId }
      });
    } catch (error) {
      console.error('Error creating album:', error);
      res.status(500).json({ error: 'Failed to create album' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
