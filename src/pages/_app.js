import '../styles/globals.scss'

import AsideMenu from '../components/AsideMenu';
import Header from '../components/Header';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <AsideMenu />
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
