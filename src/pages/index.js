import Link from "next/link";
import { useContext, useState } from "react";
import Slider from "react-slick";

import { ContextAPI } from "../context/ContextAPI";

import { api } from "../services/api";
import { formatYear } from "../utils/formatYear";
import { formatGenre } from "../utils/formatGenre";

import styles from "./Home.module.scss";
import MovieShelf from "../components/MovieShelf";

export default function Home({
  slideMoviesList,
  trendingMoviesList,
  popularMoviesList,
  topRatedMoviesList,
  nowplayingMoviesList,
}) {
  const { searchedMoviesList, isSearched } = useContext(ContextAPI);

  console.log(searchedMoviesList)

  const settingsCarousel = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (

    <div className={styles.homePage}>
      {isSearched && searchedMoviesList ? (
        <section className={styles.searchedMoviesList}>
          {searchedMoviesList.map((movie, index) => {
        return (
          <Link href={`./movie/${movie.id}`}>
            <div key={movie.id} className={styles.card__movie}>

              <div className={styles.image__movie}>
                <img className={styles.image__img} src={movie.poster} alt={movie.title} />

                <figcaption className={styles.image__overlay}>
                  <div className={styles.image__rating}>
                    <i>
                      <svg viewBox="0 0 512.002 512.002">
                        <path d="M511.267,197.258c-1.764-5.431-6.457-9.389-12.107-10.209l-158.723-23.065L269.452,20.157
                          c-2.526-5.12-7.741-8.361-13.45-8.361c-5.71,0-10.924,3.241-13.451,8.361l-70.988,143.827l-158.72,23.065
                          c-5.649,0.82-10.344,4.778-12.108,10.208c-1.765,5.431-0.293,11.392,3.796,15.377l114.848,111.954L92.271,482.671
                          c-0.966,5.628,1.348,11.314,5.967,14.671c2.613,1.898,5.708,2.864,8.818,2.864c2.388,0,4.784-0.569,6.978-1.723l141.967-74.638
                          l141.961,74.637c5.055,2.657,11.178,2.215,15.797-1.141c4.619-3.356,6.934-9.044,5.969-14.672l-27.117-158.081l114.861-111.955
                          C511.56,208.649,513.033,202.688,511.267,197.258z"/>
                      </svg>
                    </i>
                    <h4>{movie.rating} / 10</h4>
                  </div>

                  <div className={styles.image__genre}>
                    <h4>{movie.genres[0]} </h4>
                    <h4>{movie.genres[1]}</h4>
                  </div>

                  <span className={styles.button__details}>
                    Ver Detalhes
                  </span>

                </figcaption>
              </div>
              <strong className={styles.movie__title}>{movie.title}</strong>
              <p className={styles.movie__year}>{movie.year}</p>
            </div>
          </Link>
        )
      })}
        </section>
      ) : (
        <>
          <section className={styles.carousel}>
            <Slider {...settingsCarousel}>
              {slideMoviesList.map((slideMovie) => {
                return (
                  <>
                    <Link href={`/movie/${slideMovie.id}`} key={slideMovie.id}>
                      <div key={slideMovie.id}>
                        <img src={slideMovie.backdrop} />
                      </div>
                    </Link>
                    <div className={styles.caption}>
                      <h3>{slideMovie.title}</h3>
                      <p>{slideMovie.description}</p>
                    </div>
                  </>
                );
              })}
            </Slider>
          </section>

          <section className={styles.moviesList}>
            <h2>Em cartaz</h2>
            <MovieShelf element={nowplayingMoviesList} />

            <h2>Filmes do dia</h2>
            <MovieShelf element={trendingMoviesList} />

            <h2>Populares</h2>
            <MovieShelf element={popularMoviesList} />

            <h2>Mais votados</h2>
            <MovieShelf element={topRatedMoviesList} />
          </section>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = async () => {

  const posterURL = "https://image.tmdb.org/t/p/w200";
  const backdropURL = "https://image.tmdb.org/t/p/original";

  const trending = await api.get("trending/movie/day");
  const popular = await api.get("movie/popular");
  const toprated = await api.get("movie/top_rated");
  const nowplaying = await api.get("/movie/now_playing", {
    params: {
      region: "BR",
    },
  });

  const trendingMoviesList = trending.data.results.map((movie) => {
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
  });

  const slideMoviesList = trending.data.results
    .map((movie) => {
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
    })
    .slice(0, 8);

  const popularMoviesList = popular.data.results.map((movie) => {
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
  });

  const topRatedMoviesList = toprated.data.results.map((movie) => {
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
  });

  const nowplayingMoviesList = nowplaying.data.results.map((movie) => {
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
  });

  return {

    props: {
      trendingMoviesList,
      slideMoviesList,
      popularMoviesList,
      topRatedMoviesList,
      nowplayingMoviesList,
    },

    // revalidate: 60 * 60 * 8, // 8 hours
  };
};

