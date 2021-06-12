import Link from "next/link";
import { useContext, useEffect, useState } from 'react';

import { ContextAPI } from '../../context/ContextAPI';
import { api } from '../../services/api'

import styles from './AsideMenu.module.scss'

export default function AsideMenu() {
  
  const { movieGenreList, setMovieGenreList, setPath, path } = useContext(ContextAPI);
  
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

  useEffect(() => {
  
    let pathURL = document.location.pathname;
    setPath(pathURL);    

  }, [path])

  function handleMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  async function handleGenre(genre_id) {
    // const fetchGenresByMovie = await api.get(`/discover/movie`, {
    //   params: {
    //     with_genres: `${genre_id}`,
    //   }
    // });

    // console.log(`fetched movie by genre id ${genre_id}, array => `);
    // console.log(fetchGenresByMovie);

    // setMovieGenreList(fetchGenresByMovie.data.results);
    // console.log(movieGenreList);

    
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
          {fetchGenre?.data.genres.map((genre, index) => {
            return (
              <li key={genre.id}>
                <Link href={path == '/' ? `./movie/genre/${genre.id}` : `../../movie/genre/${genre.id}`} genre={`${genre.name}`} >
                  {genre.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  );
}
