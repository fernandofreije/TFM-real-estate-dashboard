import { ReactElement } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  TickFormatterFunction,
  ResponsiveContainer,
  TooltipFormatter,
} from 'recharts';
import { Summary } from '../models/Summary';
import Loading from './Loading';
import { withSeparator } from '../util/NumberUtil';

interface LinearGraphProps {
  summaries: Summary[];
  YaxisField?: keyof Summary;
  XaxisField?: keyof Summary;
  xFormatter?: TickFormatterFunction;
  YFormatter?: TickFormatterFunction;
  tooltopFormatter?: TooltipFormatter;
}

export default function LinearGraph({
  summaries,
  YaxisField,
  XaxisField,
  xFormatter,
  YFormatter,
  tooltopFormatter,
}: LinearGraphProps): ReactElement {
  if (!summaries) return <Loading />;

  return (
    <ResponsiveContainer width="90%" minWidth={600} height={300}>
      <LineChart data={summaries} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey={YaxisField} stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={XaxisField} tickFormatter={xFormatter} />
        <YAxis tickFormatter={YFormatter} />
        <Tooltip formatter={tooltopFormatter} labelStyle={{ color: 'black' }} labelFormatter={xFormatter} label={''} />
      </LineChart>
    </ResponsiveContainer>
  );
}
