import Head from 'next/head';
import { useEffect } from 'react';

import Link from 'next/link';

import { api } from '../services/api'

import styles from './Home.module.scss';

export default function Home({trendingMoviesList}) {

  console.log(trendingMoviesList);

  function showInfo(){
    console.log('passou');
  }

  return (
    <div className={styles.homePage}>

      <section className={styles.movies}>
        <h2>Filmes da semana</h2>
        
        <div className={styles.gridMovies}>
          {trendingMoviesList.map((el, index) => {
            return(
                            
              <div key={el.id}>
                  {/* <a href="movie/#" onMouseEnter={() => {
                    console.log(el.title, index)
                    // console.log(document.querySelector(`img[src$="${el.poster}"]`))
                    // document.querySelector(`img[src$="${el.poster}"]`).appendChild.innerHTML = `Tst`;
                    // document.querySelector(`img[src$="${el.poster}"]`).appendChild.innerHTML = `Tst`;
                  }} > */}
                    <div className={styles.image}> 
                        <img className={styles.image__img} src={el.poster} alt={el.title}/>

                        <div className={styles.image__overlay}>
                          <div className={styles.image__title}>{el.title}</div>

                          <span>Ver Detalhes</span>
                        </div>
                    </div>
                    <p>{el.title}</p>

                  {/* </a> */}
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

  console.log(response.data.results);

  const trendingMoviesList = response.data.results.map(movie => {
    const posterURL = 'https://image.tmdb.org/t/p/w200';

    return {
      id: movie.id,
      title: movie.title,
      poster: `${posterURL}${movie.poster_path}`
    }
  })

  return {
    props: {
      trendingMoviesList,
    }
  }

}