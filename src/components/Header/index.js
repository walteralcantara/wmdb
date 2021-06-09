import Link from 'next/link';
import { useState, useContext } from 'react';

import { api } from '../../services/api'

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './Header.module.scss';
import { ContextAPI } from '../../context/ContextAPI';
import AsideMenu from '../AsideMenu';

export default function Header({ list }) {

  const {searchText, setSearchText, handleSearch, setIsSearched} = useContext(ContextAPI)


  const currentDate = format(new Date(), 'EEEEEE, dd MMMM', {
    locale: ptBR,
  }).toString()

  return (
    <header className={styles.headerContainer}>
      
      <AsideMenu />

      <div className={styles.logo} onClick={() => setIsSearched(false)}>
        <Link href="/">
          <h1>WMDB</h1>
        </Link>
      </div>


      <div className={styles.searchBox}>
        <input className={styles.searchInput} type="text"  placeholder="Pesquise filmes..."  onChange={(el) => setSearchText(el.target.value)}/>

        <button className={styles.searchBtn} type="submit" onClick={handleSearch}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-fw"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>
        </button>
      </div>

      


      <span id={styles.current_date}>{currentDate}</span>

    </header>
  );
}
