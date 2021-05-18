import '../styles/globals.scss'
import '../styles/slick.scss';

import { ContextAPIProvider } from '../context/ContextAPI'

import AsideMenu from '../components/AsideMenu';
import Header from '../components/Header';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ContextAPIProvider>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <AsideMenu />
          <Component {...pageProps} />
        </main>
      </div>
      </ContextAPIProvider>
    </>
  )
}

export default MyApp
