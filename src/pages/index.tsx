import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Real Estate Data Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar></SearchBar>
      <main className={styles.main}></main>
    </div>
  );
}
