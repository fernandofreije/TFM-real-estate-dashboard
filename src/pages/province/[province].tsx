import { ReactElement } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { RealEstateMongoDriver } from '../../database/RealEstateMongoDriver';
import { Summary } from '../../models/Summary';
import { withSeparator } from '../../util/NumberUtil';
import Layout from '../../components/Layout';
import styles from '../../styles/ProvinceView.module.css';

interface ProvinceViewProps {
  todaySummary: Summary;
  province: string;
}

export default function ProvinceView({ todaySummary, province }: ProvinceViewProps): ReactElement {
  const { avg_price, avg_size, total } = todaySummary;

  return (
    <Layout>
      <div className={styles.container}>
        <h1>{province}</h1>
        <h3>
          Total Records: <span>{total}</span>
        </h3>
        <h3>
          Avg Price: <span>{withSeparator(avg_price)} €</span>
        </h3>
        <h3>
          Total Records:{' '}
          <span>
            {Math.round(avg_size * 10) / 10} m<sup>2</sup>
          </span>
        </h3>
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
