import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import LinearGraph from '../../components/LinearGraph';
import { RealEstateMongoDriver } from '../../database/RealEstateMongoDriver';
import { Summary } from '../../models/Summary';
import styles from '../../styles/ProvinceView.module.css';
import { thousandsAsK, withSeparator } from '../../util/NumberUtil';
import { Operation } from '../../models/Operation';
import RealEstateList from '../../components/RealEstateList';
import { RealEstate } from '../../models/RealEstate';

interface ProvinceViewProps {
  todaySummary: Summary;
  province: string;
  operation: string;
}

export default function ProvinceView({ todaySummary, province, operation }: ProvinceViewProps): ReactElement {
  const { avg_price, avg_size, total } = todaySummary;

  const [summaries, setSummaries] = useState<Summary[]>(undefined);
  const [realEstates, setRealEstates] = useState<RealEstate[]>(undefined);

  useEffect(() => {
    const getSummaries = async () => {
      const response = await fetch(`/api/summaries?province=${province}&operation=${operation}`);
      if (response.ok) {
        setSummaries(await response.json());
      }
    };
    const getRealEstates = async () => {
      const url =
        province === 'all'
          ? `/api/realEstates?operation=${operation}`
          : `/api/realEstates?province=${province}&operation=${operation}`;
      const response = await fetch(url);
      if (response.ok) {
        setRealEstates(await response.json());
      }
    };
    getSummaries();
    getRealEstates();
  }, []);

  return (
    <Layout province={province} currentOperation={operation}>
      <div className={styles.column}>
        <div className={styles.container}>
          <h1>{province === 'all' ? 'España' : province} Today</h1>
          <h3>
            Published Records: <span>{withSeparator(total)}</span>
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
            YFormatter={(yValue: number) =>
              `${operation === Operation.SALE ? thousandsAsK(yValue) : withSeparator(yValue)} €`
            }
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
      </div>
      <div className={styles.column}>
        <div className={styles.container}>
          <h2>Last real estates</h2>
          <RealEstateList realEstates={realEstates} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  params,
  query,
  res,
  req,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProvinceViewProps>> {
  const { province } = params as { province: string };
  const { operation } = query as { operation: Operation };

  if (!operation || !Object.values(Operation).includes(operation)) {
    res.statusCode = 302;
    res.setHeader('Location', req.url + `?operation=${Operation.SALE}`);
    return {} as GetServerSidePropsResult<ProvinceViewProps>;
  }

  const todaySummary = await new RealEstateMongoDriver().todaysSummary({ province, operation });

  return {
    props: {
      todaySummary,
      province,
      operation,
    },
  };
}
