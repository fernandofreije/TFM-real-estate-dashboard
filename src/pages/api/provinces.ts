import { RealEstateMongoDriver } from '../../database/RealEstateMongoDriver';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const provinces = await new RealEstateMongoDriver().getProvinces();
  return res.status(200).json(provinces);
});
