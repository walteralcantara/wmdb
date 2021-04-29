import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import { api } from '../services/api'
import { formatYear } from '../utils/formatYear';
import { formatGenre } from '../utils/formatGenre';


import styles from './Home.module.scss';


export default function Home({trendingMoviesList}) {

  console.log(trendingMoviesList);

  return (
    <div className={styles.homePage}>

      <section className={styles.movies}>
        <h2>Filmes da semana</h2>
        
        <div className={styles.gridMovies}>
          {trendingMoviesList.map((el, index) => {
            return(
                            
              <div key={el.id} className={styles.card__movie}>

                    <div className={styles.image__movie}> 
                        <img className={styles.image__img} src={el.poster} alt={el.title}/>

                        <figcaption className={styles.image__overlay}>
                            <div className={styles.image__rating}>
                              <h4>{el.rating} / 10</h4>
                            </div>
                            
                            <div className={styles.image__genre}>
                              <h4>{el.genres[0]}</h4>
                              <h4>{el.genres[1]}</h4>                          
                            </div>

                            <span className={styles.button__details}>Ver Detalhes</span>
                        </figcaption>
                    </div>

                    <strong className={styles.movie__title}>{el.title}</strong>
                    <p className={styles.movie__year}>{el.year}</p>
                  
              </div>
              
            )
          })}
        </div>

      </section>

    </div>
  );

}


export const getServerSideProps = async () => {

  // const res = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=d98980b6f729b75d3b64c9e86c4e45fa&language=pt-BR');

  // const json = await res.json();

  const response = await api.get('trending/movie/week', {
    params : {
      api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
      language: 'pt-BR',
    }
  })

  // console.log(response.data.results);

  const trendingMoviesList = response.data.results.map(movie => {
    const posterURL = 'https://image.tmdb.org/t/p/w200';

    return {
      id: movie.id,
      title: movie.title,
      poster: `${posterURL}${movie.poster_path}`,
      rating: movie.vote_average,
      year: formatYear(movie.release_date),
      genres: formatGenre(movie.genre_ids),
    }
  })

  return {
    props: {
      trendingMoviesList,
    }
  }

}