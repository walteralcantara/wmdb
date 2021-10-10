import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { api } from '../../services/api';

import { formatYear } from '../../utils/formatYear'
import { formatGenre } from '../../utils/formatGenre';
import { formatToHoursAndMinutes } from '../../utils/formatToHoursAndMinutes';
import { hideHeader } from '../../utils/hideHeader';

import { ContextAPI } from '../../context/ContextAPI';

import MoviesShelf from '../../components/MoviesShelf';
import MoviesList from '../../components/MoviesList';
import Modal from '../../components/Modal';

import BackIcon from '../../assets/icons/back.svg';
import PlayIcon from '../../assets/icons/play.svg';
import TmdbIcon from '../../assets/icons/tmdb.svg';

import styles from './movie.module.scss';

export default function MovieItem({ 
  movieInfo,
  movieCast,
  similarMovies,
  movieVideo,
}) {

  const { 
    setIsModalOpen,
    flag,
    setFlag,
    path
  } = useContext(ContextAPI);

  useEffect(() => {
    hideHeader();
  }, [path])

  return (
    <>
      <Head>
        <title>
          {movieInfo.title} - {movieInfo.year}
        </title>
      </Head>

      <button className={styles.back}>
        <Link href="/">
          <BackIcon width="25" />
        </Link>
      </button>

      <section className={styles.container}>
        
        <Modal
          element={movieInfo}
          video={movieVideo}
        />

        <header className={styles.cover}
          onClick={() => {
            setIsModalOpen(true);
            setFlag(!flag);
          }}
        >
          <img src={movieInfo.backdrop} alt={movieInfo.title} />
          
          <div className={styles.playIcon}>
            <PlayIcon />
          </div>
        </header>

        <main className={styles.details}>
          <aside className={styles.poster}>
            <img src={movieInfo.poster} alt={movieInfo.title} />
          </aside>

          <article className={styles.data}>
            <h2>{movieInfo.title}</h2>

            <div className={styles.metadata}>
              <span>
                <TmdbIcon />
                {movieInfo.rating}
              </span>
              <span>{movieInfo.runtime}</span>
              <span>{movieInfo.year}</span>
            </div>

            <p className={styles.description}>
              {movieInfo.description}
            </p>

            <p className={styles.genres}>
              <strong>Gêneros: </strong>
              {movieInfo.genres.map((genre) => {
                return <span key={genre.name}>{genre.name}</span>;
              })}
            </p>

            <div className={styles.cast}>
              <strong>Elenco:</strong>

              <ul className={styles.crew}>
                {movieCast.cast.map((actor) => {
                  return (
                    <li key={actor.profile_path}>
                      <img
                        src={actor.profile_path != null 
                          ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                          : '../no-avatar.png'}
                      />
                      <strong>{actor.name}</strong>
                      <span>{actor.character}</span>
                    </li>
                  );
                })}

                <li>
                  <img
                    src={movieCast.director.profile_path != null
                      ? `https://image.tmdb.org/t/p/w500/${movieCast.director.profile_path}`
                      : '/no-avatar.png'}
                  />
                  <strong>{movieCast.director.name}</strong>
                  <span>Diretor</span>
                </li>

              </ul>
            </div>
          </article>
        </main>

        <footer className={styles.similar}>
          {similarMovies.length <= 4 ? (
            <MoviesList 
              title="Filmes similares" 
              movieList={similarMovies}
            />
          ) : (
            <MoviesShelf
              title="Filmes similares" 
              movieShelf={similarMovies}
            />
          )}
        </footer>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps(ctx) {

  const movie = ctx.params;
  
  const response = await api.get(`movie/${movie.id}`)
  const responseCredits = await api.get(`movie/${movie.id}/credits`)
  const responseSimilar = await api.get(`movie/${movie.id}/similar`)  
  const responseVideo = await api.get(`movie/${movie.id}/videos`, {
    params: {
      language: 'pt-BR',
    }
  });

  const posterURL = 'https://image.tmdb.org/t/p/w200';
  const backdropURL = 'https://image.tmdb.org/t/p/original'

  const movieInfo = {
    id: response.data.id,
    title: response.data.title,
    poster: posterURL + response.data.poster_path,
    backdrop: backdropURL + response.data.backdrop_path,
    description: response.data.overview,
    genres: response.data.genres,
    year: formatYear(response.data.release_date),
    rating: response.data.vote_average,
    runtime: formatToHoursAndMinutes(response.data.runtime),
  }

  let lastFive = responseCredits.data.cast.slice(0, 6);
  let director = responseCredits.data.crew.find(el => el.department === 'Directing');

  const movieCast = {
    id: responseCredits.data.id,
    cast: lastFive,
    director: director
  }

  const similarMovies = responseSimilar.data.results.map(similarMovie => {
    return {
      id: similarMovie.id,
      poster: posterURL + similarMovie.poster_path,
      genres: formatGenre(similarMovie.genre_ids),
      year: formatYear(similarMovie.release_date),
      title: similarMovie.title,
      rating: similarMovie.vote_average.toFixed(1),
    }
  })

  return {
    props: {
      movieInfo: movieInfo,
      movieCast: movieCast,
      similarMovies: similarMovies,
      movieVideo: responseVideo.data,
    },
  };
}

