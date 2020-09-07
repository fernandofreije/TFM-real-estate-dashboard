import Loader from 'react-loader-spinner';
import { ReactElement } from 'react';

export default function Loading(): ReactElement {
  return <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={999} />;
}
