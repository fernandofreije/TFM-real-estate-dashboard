import { RealEstateMongoDriver } from '../../database/RealEstateMongoDriver';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { province, operation } = req.query as { province: string; operation: string };
  const summaries = await new RealEstateMongoDriver().newSummariesLasYear({ province, operation });
  return res.status(200).json(summaries);
});
