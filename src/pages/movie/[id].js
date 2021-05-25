import { useContext } from 'react';
import Head from 'next/head';

import { api } from '../../services/api';
import { formatYear } from '../../utils/formatYear'
import { formatGenre } from '../../utils/formatGenre';
import { formatToHoursAndMinutes } from '../../utils/formatToHoursAndMinutes';

import { ContextAPI } from '../../context/ContextAPI';
import MovieShelf from '../../components/MovieShelf';
import Modal from '../../components/Modal';

import styles from '../movie/movie.module.scss';


export default function MovieItem({ movieInfo, movieCast, similarMovies, movieVideo }) {

  const { setIsModalOpen, flag, setFlag } = useContext(ContextAPI);

  return (
    <>
    <Head>
      <title>{movieInfo.title} - {movieInfo.year}</title>
    </Head>

    <div className={styles.moviePageContainer}>

    <Modal element={movieInfo} video={movieVideo} />

      <div className={styles.background} onClick={() => {
        setIsModalOpen(true);
        setFlag(!flag);
        }}>

        <img src={movieInfo.backdrop} />
        <i className={styles.playIcon}>
          <svg viewBox="0 0 512 512">
            <path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M357.771,264.969
              l-149.333,96c-1.75,1.135-3.771,1.698-5.771,1.698c-1.75,0-3.521-0.438-5.104-1.302C194.125,359.49,192,355.906,192,352V160
              c0-3.906,2.125-7.49,5.563-9.365c3.375-1.854,7.604-1.74,10.875,0.396l149.333,96c3.042,1.958,4.896,5.344,4.896,8.969
              S360.813,263.01,357.771,264.969z"/>
          </svg>
        </i>
      </div>

      <div className={styles.moviePageDetails}>

        <div className={styles.moviePoster}>
          <img src={movieInfo.poster} />
        </div>

        <div className={styles.movieSubInfo}>
          <h2>{movieInfo.title}</h2>

          <div>
            <span>
              <svg viewBox="0 0 273.42 35.52">
                <path class="cls-1" d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1,35.42h7.8V6.92H28V0H0v6.9H10.1Zm28.1,0H46V8.25h.1L55.05,35.4h6L70.3,8.25h.1V35.4h7.8V0H66.45l-8.2,23.1h-.1L50,0H38.2ZM89.14.12h11.7a33.56,33.56,0,0,1,8.08,1,18.52,18.52,0,0,1,6.67,3.08,15.09,15.09,0,0,1,4.53,5.52,18.5,18.5,0,0,1,1.67,8.25,16.91,16.91,0,0,1-1.62,7.58,16.3,16.3,0,0,1-4.38,5.5,19.24,19.24,0,0,1-6.35,3.37,24.53,24.53,0,0,1-7.55,1.15H89.14Zm7.8,28.2h4a21.66,21.66,0,0,0,5-.55A10.58,10.58,0,0,0,110,26a8.73,8.73,0,0,0,2.68-3.35,11.9,11.9,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9.17,9.17,0,0,0-2.63-3.18A11.61,11.61,0,0,0,106.22,8a17.06,17.06,0,0,0-4.68-.63h-4.6ZM133.09.12h13.2a32.87,32.87,0,0,1,4.63.33,12.66,12.66,0,0,1,4.17,1.3,7.94,7.94,0,0,1,3,2.72,8.34,8.34,0,0,1,1.15,4.65,7.48,7.48,0,0,1-1.67,5,9.13,9.13,0,0,1-4.43,2.82V17a10.28,10.28,0,0,1,3.18,1,8.51,8.51,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.32,9.32,0,0,1-3.1,3A13.38,13.38,0,0,1,152.32,35a22.5,22.5,0,0,1-4.73.5h-14.5Zm7.8,14.15h5.65a7.65,7.65,0,0,0,1.78-.2,4.78,4.78,0,0,0,1.57-.65,3.43,3.43,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8A3.3,3.3,0,0,0,151,8.6a3.42,3.42,0,0,0-1.23-1.13A6.07,6.07,0,0,0,148,6.9a9.9,9.9,0,0,0-1.85-.18h-5.3Zm0,14.65h7a8.27,8.27,0,0,0,1.83-.2,4.67,4.67,0,0,0,1.67-.7,3.93,3.93,0,0,0,1.23-1.3,3.8,3.8,0,0,0,.47-1.95,3.16,3.16,0,0,0-.62-2,4,4,0,0,0-1.58-1.18,8.23,8.23,0,0,0-2-.55,15.12,15.12,0,0,0-2.05-.15h-5.9Z" />
              </svg>
              {movieInfo.rating}
            </span>
            <span>{movieInfo.runtime}</span>
            <span>{movieInfo.year}</span>
          </div>

          <p>{movieInfo.description}</p>

          <p className={styles.genresList}>
            <strong>Gêneros: </strong>
            {movieInfo.genres.map((genre) => {
              return (
                <span key={genre.name}>{genre.name}</span>
              )
            })}</p>

          <div className={styles.movieSubCast}>
            <strong>Elenco:</strong>
            <div className={styles.gridCast}>
              {movieCast.cast.map(actor => {
                return (
                  <div>
                    <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} />
                    <strong>{actor.name}</strong>
                    <span>{actor.character}</span>
                  </div>
                )
              })}
              <div>
                {<img src={`https://image.tmdb.org/t/p/w500/${movieCast.director.profile_path}`} />}
                <strong>{movieCast.director.name}</strong>
                <span>Diretor</span>
              </div>
            </div>
          </div>          

        </div>
      
      </div>

      <div className={styles.similarMovies}>
        
        <h2>Filmes similares</h2>
        <MovieShelf element={similarMovies} />

      </div>

    </div >
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
      language: 'en-US',
    }
  });

  const posterURL = 'https://image.tmdb.org/t/p/w500';
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
    director: director,
  }

  const similarMovies = responseSimilar.data.results.map(similarMovie => {
    return {
      id: similarMovie.id,
      poster: posterURL + similarMovie.poster_path,
      genres: formatGenre(similarMovie.genre_ids),
      year: formatYear(similarMovie.release_date),
      title: similarMovie.title,
      rating: similarMovie.vote_average,
    }
  })

  const movieVideo = responseVideo.data;
  const responseData = response.data;
  const responseSimilarData = responseSimilar.data.results;

  return {
    props: {
      responseData: responseData,
      movieInfo: movieInfo,
      movieCast: movieCast,
      similarMovies: similarMovies,
      movieVideo: movieVideo,
    },
  };
}

