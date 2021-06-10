import Link from "next/link";
import Head from "next/head";

import { useContext, useState } from "react";
import Slider from "react-slick";


import { ContextAPI } from "../context/ContextAPI";

import { api } from "../services/api";
import { formatYear } from "../utils/formatYear";
import { formatGenre } from "../utils/formatGenre";

import styles from "./Home.module.scss";
import MovieShelf from "../components/MovieShelf";
import Carousel from "../components/Carousel";
import MoviesList from "../components/MoviesList";

export default function Home({
  slideMoviesList,
  trendingMoviesList,
}) {
  const { searchedMoviesList, isSearched } = useContext(ContextAPI);
  
  console.log(slideMoviesList);



  return (
    <>
    <Head>
      <title>WMDB</title>
    </Head>
    
    <div className={styles.homePage}>
      {isSearched && searchedMoviesList ? (
        <MoviesList el={searchedMoviesList} />
      ) : (
        <>
          <Carousel el={slideMoviesList} />          

          <section className={styles.moviesList}>

            <h2>Recomendados</h2>
            <MoviesList el={trendingMoviesList} />

            {/* <MovieShelf element={trendingMoviesList} /> */}

          </section>
        </>
      )}
    </div>
    </>
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

