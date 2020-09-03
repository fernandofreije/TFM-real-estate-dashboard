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
}
