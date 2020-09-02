import { MongoClient } from 'mongodb';

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
}
