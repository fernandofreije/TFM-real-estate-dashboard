import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, ReactNode } from 'react';
import SearchBar from '../components/SearchBar';
import { Operation } from '../models/Operation';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
  province?: string;
  currentOperation?: string;
}

export default function Layout({ children, province, currentOperation }: LayoutProps): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Real Estate Data Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Real Estate Data Visualizer</h1>
        <SearchBar></SearchBar>
        {province && currentOperation && (
          <div className={styles.operationSelectorContainer}>
            <Link href={`${province}?operation=${Operation.SALE}`}>
              <a
                className={currentOperation === Operation.SALE ? styles.operationSelected : ''}
                style={{ paddingRight: 10 }}
              >
                Sale
              </a>
            </Link>
            <Link href={`${province}?operation=${Operation.RENT}`}>
              <a className={currentOperation === Operation.RENT ? styles.operationSelected : ''}>Rent</a>
            </Link>
          </div>
        )}
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
