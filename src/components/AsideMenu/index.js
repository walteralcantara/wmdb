import Head from 'next/head';

import styles from './AsideMenu.module.scss'

export default function AsideMenu() {
  return (
    <aside className={styles.asideContainer}>
      <h2>Aside</h2>
    </aside>
  );
}
