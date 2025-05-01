// pages/api/albums/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb'; // <-- Import ObjectId from 'mongodb'
import { connectToDatabase } from '../../../../lib/mongodb'; // Adjust path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ObjectId format' });
  }

  try {
    const { db } = await connectToDatabase();

    if (req.method === 'DELETE') {
      const result = await db.collection('album').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Album not found' });
      }

      return res.status(200).json({ message: 'Album deleted successfully' });
    } else if (req.method === 'PUT') {
      const { title, image } = req.body;

      if (!title || !image) {
        return res.status(400).json({ error: 'Title and image are required' });
      }

      const result = await db.collection('album').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            image,
            updatedAt: new Date().toISOString()
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Album not found' });
      }

      return res.status(200).json({
        message: 'Album updated successfully',
        album: { _id: id, title, image }
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling album:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('connect ECONNREFUSED')) {
        return res.status(500).json({ error: 'Could not connect to database. Please check your MongoDB connection.' });
      }
      if (error.message.includes('Authentication failed')) {
        return res.status(500).json({ error: 'Database authentication failed. Please check your credentials.' });
      }
    }
    
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}
