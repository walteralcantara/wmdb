import { useEffect, useState } from 'react';
import { api } from '../../services/api'


import styles from './AsideMenu.module.scss'

export default function AsideMenu() {

  const [fetchGenre, setFetchGenre] = useState(null);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      const response = await api.get('genre/movie/list', {
        params: {
          api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
          language: 'pt-BR',
        }
      })

      setFetchGenre(response);
    }

    fetchGenres()
  }, [])

  function handleMenu() {
    setIsOpenMenu(!isOpenMenu);
    console.log(isOpenMenu)
  }

  return (
    <>
      <div className={isOpenMenu ? `${styles.hamburguerMenu} ${styles.active}` : styles.hamburguerMenu} onClick={handleMenu}>
        <div className={styles.navIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <aside className={isOpenMenu ? `${styles.asideContainer} ${styles.active}` : styles.asideContainer}>
        <ul>
          {fetchGenre?.data.genres.map((genre) => {
            return (
              <li key={genre.id}>
                <a href="#">{genre.name}</a>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  );
}
