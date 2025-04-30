// pages/api/albums/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb'; // <-- Import ObjectId from 'mongodb'
import connectToDatabase from '../../../../lib/mongodb'; // Adjust path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  // Handle DELETE request
  if (req.method === 'DELETE') {
    const { id } = req.query; // Get the album id from the URL parameter

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId format' });
        }
      // Perform the delete operation
      const result = await db.collection('album').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Album not found' });
      }

      return res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete album' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
