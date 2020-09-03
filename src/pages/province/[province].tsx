import SearchBar from '../../components/SearchBar';
import { ReactElement } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { RealEstateMongoDriver } from '../../database/RealEstateMongoDriver';
import { Summary } from '../../models/Summary';

interface ProvinceViewProps {
  todaySummary: Summary;
  province: string;
}

export default function ProvinceView({ todaySummary, province }: ProvinceViewProps): ReactElement {
  return (
    <div>
      <h1>{province}</h1>
      <h2>
        Total <span>{todaySummary.total}</span>
      </h2>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProvinceViewProps>> {
  const { province } = params as { province: string };
  const todaySummary = await new RealEstateMongoDriver().todaysSummary({ province, operation: 'all' });

  console.log(todaySummary);

  return {
    props: {
      todaySummary,
      province,
    },
  };
}
