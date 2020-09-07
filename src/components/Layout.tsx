import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import SearchBar from '../components/SearchBar';
import { ReactElement, ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Real Estate Data Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Real Estate Data Visualizer</h1>
        <SearchBar></SearchBar>
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
