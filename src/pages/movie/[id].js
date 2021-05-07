import Head from 'next/head';
import Link from 'next/link';

import { api } from '../../services/api';

import styles from '../movie/movie.module.scss';

export default function MovieItem({ responseData, movieInfo }) {

  console.log('RESPONSEDATA:', responseData)
  console.log('INFO:', movieInfo)
  console.log('GENRE:', movieInfo.genres)


  return (
    <div className={styles.moviePageContainer}>

      <div className={styles.background}>
        <img src={movieInfo.backdrop} />
      </div>

      <div className={styles.moviePageDetails}>

        <div className={styles.moviePoster}>
          <img src={movieInfo.poster} />
        </div>

        <div className={styles.movieSubInfo}>
          <h2>{movieInfo.title}</h2>

          <div>
            <span>{movieInfo.rating}</span>
            <span>{movieInfo.runtime}</span>
            <span>{movieInfo.date}</span>
          </div>


          <p>{movieInfo.description}</p>

          <p className={styles.genresList}><strong>Gêneros:</strong> {movieInfo.genres.map((genre) => {
            return (
              <span>{genre.name}</span>
            )
          })}</p>
        </div>

      </div>
    </div>
  );
}


export async function getServerSideProps(ctx) {

  const movie = ctx.params;

  // console.log(`movie/${movie.id}`)

  const response = await api.get(`movie/${movie.id}`, {
    params: {
      api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
      language: 'pt-BR',
    }
  })

  // console.log(response.data)

  const posterURL = 'https://image.tmdb.org/t/p/w500';
  const backdropURL = 'https://image.tmdb.org/t/p/original'

  response.data.genres.map((genre) => {
    console.log(genre);
    genre.name

  })


  const movieInfo = {
    id: response.data.id,
    title: response.data.title,
    poster: posterURL + response.data.poster_path,
    backdrop: backdropURL + response.data.backdrop_path,
    description: response.data.overview,
    genres: response.data.genres,
    date: response.data.release_date,
    rating: response.data.vote_average,
    runtime: response.data.runtime,
  }

  const responseData = response.data;

  //   const res = await fetch(
  //     `http://localhost:3000/api/movie/${context.params.id}`,
  //   );
  //   const json = await res.json();
  //   console.log(json);


  return {
    props: {
      responseData: responseData,
      movieInfo: movieInfo,
    },
  };
}

