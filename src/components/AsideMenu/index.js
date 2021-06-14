import Link from "next/link";
import { useContext, useEffect, useState } from 'react';

import { ContextAPI } from '../../context/ContextAPI';
import { api } from '../../services/api'
import { formatGenre } from "../../utils/formatGenre";
import { formatYear } from "../../utils/formatYear";

import styles from './AsideMenu.module.scss'

export default function AsideMenu() {
  
  const { setMovieGenreList, path } = useContext(ContextAPI);
  
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
    fetchGenres();
  }, [])

  function handleMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  async function handleGenre(genre_id) {
    const fetchGenresByMovie = await api.get(`/discover/movie`, {
      params: {
        with_genres: `${genre_id}`,
      }
    });

    setMovieGenreList(fetchGenresByMovie.data.results.map((movie) => {
      const posterURL = "https://image.tmdb.org/t/p/w200";
      const backdropURL = "https://image.tmdb.org/t/p/original";

      return {
        id: movie.id,
        title: movie.title,
        poster: `${posterURL}${movie.poster_path}`,
        backdrop: `${backdropURL}${movie.backdrop_path}`,
        rating: movie.vote_average,
        year: formatYear(movie.release_date),
        genres: formatGenre(movie.genre_ids),
        description: movie.overview,
      };
    }));
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
              <li key={genre.id} 
              onClick={() => {
                handleGenre(genre.id)
              }}>
                <Link 
                  href={path == '/' ? `./genre/${genre.name}` : `../genre/${genre.name}`}
                  genre={`${genre.name}`}
                >
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
