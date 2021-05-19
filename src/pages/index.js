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
  const { movieList, isSearched } = useContext(ContextAPI);

  console.log("HOME:", movieList);

  const settingsCarousel = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.homePage}>
      {isSearched && movieList ? (
        <section className={styles.moviesList}>
          {movieList.map((movie) => {
            return (
              <div>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                <p>{movie.title}</p>
              </div>
            );
          })}
        </section>
      ) : (
        <>
          <section className={styles.carousel}>
            <Slider {...settingsCarousel}>
              {slideMoviesList.map((slideMovie) => {
                return (
                  <>
                    <Link href={`/movie/${slideMovie.id}`}>
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

export const getStaticProps = async () => {
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

    revalidate: 60 * 60 * 8, // 8 hours
  };
};
