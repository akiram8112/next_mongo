import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/mongodb';

interface Album {
  _id: string;
  id : string;
  userId: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  try {

    const albums = await db
      .collection('album') // Replace 'albums' with your collection name
      .find({})
      .toArray();

    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
}
