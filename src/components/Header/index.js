import Link from 'next/link';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './Header.module.scss';

export default function Header() {

  const currentDate = format(new Date(), 'EEEEEE, dd MMMM', {
    locale: ptBR,
  }).toString()

  return (
    <header className={styles.headerContainer}>

      <div className={styles.logo}>
        <Link href="/">
          <svg viewBox="0 0 980 185" fill="none">
            <path d="M60.5 184.5L0 0.5V184.5H60.5Z" fill="white" />
            <path d="M129.5 0.5H52.5L89.5 116.5L129.5 0.5Z" fill="white" />
            <path d="M154.5 64L117 184.5H189L154.5 64Z" fill="white" />
            <path d="M216 116.5L179 0.5H254L216 116.5Z" fill="white" />
            <path d="M324 184.5H244L304 0.5H324V184.5Z" fill="white" />
            <path d="M494 0.5H370L433 106L494 0.5Z" fill="white" />
            <path d="M421 165L370 85V184.5H494V85L445 165H421Z" fill="white" />
            <path d="M578 0.5H540V184.5H578V0.5Z" fill="white" />
            <path d="M631 141V40H681C689 40 720 57 717 94C714.6 123.6 692 137.667 681 141H631Z" fill="white" />
            <path d="M799 184.5V0.5H690C713 0.5 772 22 771 94C770.2 151.6 716.667 178.333 690 184.5H799Z" fill="white" />
            <path d="M948 85.8667C995.5 34.5 953.333 6.81482 924 0H980V184H930C992 167.644 973 102.222 948 85.8667Z" fill="white" />
            <path d="M889.5 36H844.5V72.5H893.5C898.5 72.6667 908.7 69.3 909.5 54.5C910.3 39.7 896.5 36 889.5 36Z" fill="white" />
            <path d="M902 108.5H844V149H902C907.167 149 917.8 145 919 129C920.2 113 908.167 108.667 902 108.5Z" fill="white" />
          </svg>
        </Link>
        <span>Walter's Movie Database</span>
      </div>


      <div className={styles.searchBox}>
        <input type="text" placeholder="Pesquise filmes..." />

        <button type="submit">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-fw"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>
        </button>
      </div>

      <span id={styles.current_date}>{currentDate}</span>

    </header>
  );
}
