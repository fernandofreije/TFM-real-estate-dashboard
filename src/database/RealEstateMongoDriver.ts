import { MongoClient } from 'mongodb';
import { Summary } from '../models/Summary';

interface TodaySummaryParams {
  province: string;
  operation: string;
}

export class RealEstateMongoDriver {
  protected client;

  constructor() {
    const { MONGOURI } = process.env;
    this.client = new MongoClient(MONGOURI, {
      useNewUrlParser: true,
    });
  }

  public async getProvinces(): Promise<string[]> {
    try {
      if (!this.client.isConnected()) {
        await this.client.connect();
      }
      return this.client.db('real_estate').collection('summary').distinct('province');
    } catch (e) {
      console.log(e);
    } finally {
      this.client.close();
    }
  }

  public async todaysSummary(
    { province, operation }: TodaySummaryParams = { province: 'all', operation: 'all' },
  ): Promise<Summary> {
    try {
      if (!this.client.isConnected()) {
        await this.client.connect();
      }
      return this.client
        .db('real_estate')
        .collection('summary')
        .findOne({ province, operation, created_at_date: null }, { projection: { _id: 0 } });
    } catch (e) {
      console.log(e);
    } finally {
      this.client.close();
    }
  }

  public async newSummariesLasYear(
    { province, operation }: TodaySummaryParams = { province: 'all', operation: 'all' },
  ): Promise<Summary[]> {
    try {
      if (!this.client.isConnected()) {
        await this.client.connect();
      }

      const oneYearAgo = new Date();
      oneYearAgo.setHours(0, 0, 0, 0);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      return this.client
        .db('real_estate')
        .collection('summary')
        .find({ province, operation, created_at_date: { $gte: oneYearAgo, $ne: 'all' } }, { projection: { _id: 0 } })
        .sort({ created_at_date: 1 })
        .toArray();
    } catch (e) {
      console.log(e);
    } finally {
      this.client.close();
    }
  }

  public async lastRecords(
    { province, operation }: TodaySummaryParams = { province: 'all', operation: 'all' },
  ): Promise<any> {
    try {
      if (!this.client.isConnected()) {
        await this.client.connect();
      }

      return this.client
        .db('real_estate')
        .collection('flats')
        .find({ province, operation }, { projection: { _id: 0 } })
        .sort({ created_at: 1 })
        .limit(10)
        .toArray();
    } catch (e) {
      console.log(e);
    } finally {
      this.client.close();
    }
  }
}
