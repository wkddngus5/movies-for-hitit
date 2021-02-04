import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/movies');
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      </main>
    </div>
  )
}
