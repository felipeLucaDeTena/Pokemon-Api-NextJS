import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const currentNum = Math.floor(Math.random() * (898 - 0 + 1) + 0)
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <picture>
          <img className={styles.logo} src="/pokeLogo.png" alt="none" />
        </picture>
        <picture>
          <img
            className={styles.pokedex}
            src="/clipart1212770.png"
            alt="none"
          />
        </picture>

        <Link href={`/pokedex?page=${currentNum}`}>
          <a className={styles.button}>Start</a>
        </Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
