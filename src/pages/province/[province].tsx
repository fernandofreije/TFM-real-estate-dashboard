import { ReactElement, useEffect, useState } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { RealEstateMongoDriver } from '../../database/RealEstateMongoDriver';
import { Summary } from '../../models/Summary';
import { withSeparator, thousandsAsK } from '../../util/NumberUtil';
import Layout from '../../components/Layout';
import styles from '../../styles/ProvinceView.module.css';
import LinearGraph from '../../components/LinearGraph';
import { Timestamp } from 'mongodb';

interface ProvinceViewProps {
  todaySummary: Summary;
  province: string;
}

export default function ProvinceView({ todaySummary, province }: ProvinceViewProps): ReactElement {
  const { avg_price, avg_size, total } = todaySummary;

  const [summaries, setSummaries] = useState<Summary[]>(undefined);

  useEffect(() => {
    const getSummaries = async () => {
      const response = await fetch(`/api/summaries?province=${province}&operation=all`);
      if (response.ok) {
        setSummaries(await response.json());
      }
    };
    getSummaries();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1>{province} Today</h1>
        <h3>
          Total Records: <span>{total}</span>
        </h3>
        <h3>
          Average Price: <span>{withSeparator(avg_price)} €</span>
        </h3>
        <h3>
          Average Size:{' '}
          <span>
            {Math.round(avg_size * 10) / 10} m<sup>2</sup>
          </span>
        </h3>
      </div>
      <div className={styles.container}>
        <h2>Total of new real estate published by day</h2>
        <LinearGraph
          summaries={summaries}
          YaxisField={'total'}
          XaxisField={'created_at_date'}
          xFormatter={(xValue: string) => new Date(xValue).toLocaleDateString()}
        />
      </div>
      <div className={styles.container}>
        <h2>Average price of new real estate published by day</h2>
        <LinearGraph
          summaries={summaries}
          YaxisField={'avg_price'}
          XaxisField={'created_at_date'}
          YFormatter={(yValue: number) => `${thousandsAsK(yValue)} €`}
          xFormatter={(xValue: string) => new Date(xValue).toLocaleDateString()}
        />
      </div>
      <div className={styles.container}>
        <h2>Average size of new real estate published by day</h2>
        <LinearGraph
          summaries={summaries}
          YaxisField={'avg_size'}
          XaxisField={'created_at_date'}
          YFormatter={(yValue: number) => `${withSeparator(yValue)} m²`}
          xFormatter={(xValue: string) => new Date(xValue).toLocaleDateString()}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProvinceViewProps>> {
  const { province } = params as { province: string };
  const todaySummary = await new RealEstateMongoDriver().todaysSummary({ province, operation: 'all' });

  return {
    props: {
      todaySummary,
      province,
    },
  };
}
