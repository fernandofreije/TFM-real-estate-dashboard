import Loader from 'react-loader-spinner';
import { ReactElement } from 'react';

export default function Loading(): ReactElement {
  return <Loader type="Puff" color="#8884d8" height={100} width={100} timeout={999} />;
}
