import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from '../src/components/Dashboard';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Metodos de pronostico</title>
        <meta name="description" content="Metodos de pronostico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard 
      
      
      />

    </div>
  )
}
