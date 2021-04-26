import Head from 'next/head';

import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.headerContainer}>

      <div className={styles.logo}>
        <h2>WMDB</h2>
        <p>Walter's Movie Database</p>
      </div>

      <div className={styles.searchBox}>
        <input type="text" placeholder="Pesquise filmes..." />
      </div>

      <span>Dom, 25 de Abril</span>

    </header>
  );
}
