import Head from "next/head";

import { useContext } from "react";

import { ContextAPI } from "../context/ContextAPI";

import { api } from "../services/api";
import { formatYear } from "../utils/formatYear";
import { formatGenre } from "../utils/formatGenre";

import Carousel from "../components/Carousel";
import MoviesList from "../components/MoviesList";
import InfiniteScroll from "../components/InfiniteScroll";

export default function Home({ 
  slideMoviesList,
  trendingMoviesList
}) {

  const { 
    searchedMoviesList,
    isSearched
  } = useContext(ContextAPI);

  return (
    <>
      <Head>
        <title>WMDB</title>
      </Head>

      {isSearched && searchedMoviesList ? (
        <MoviesList
          title="Resultados"
          movieList={searchedMoviesList}
        />
      ) : (
        <>
          <Carousel el={slideMoviesList} />
          <MoviesList 
            title="Em alta hoje" 
            movieList={trendingMoviesList} 
          />
          <InfiniteScroll />
        </>
      )}
      
    </>
  );
}

export const getServerSideProps = async () => {
  const posterURL = "https://image.tmdb.org/t/p/w200";
  const backdropURL = "https://image.tmdb.org/t/p/original";

  const trending = await api.get("trending/movie/day", {
    params: {
      page: 1
    }
  });

  const { results } = trending.data

  const slideMoviesList = results.map((movie) => {
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
  }).slice(0, 8);

  const trendingMoviesList = results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: `${posterURL}${movie.poster_path}`,
      backdrop: `${backdropURL}${movie.backdrop_path}`,
      rating: movie.vote_average != 0 ? movie.vote_average : "?",
      year: formatYear(movie.release_date),
      genres: formatGenre(movie.genre_ids),
      description: movie.overview,
    };
  });

  return {
    props: {
      trendingMoviesList,
      slideMoviesList,
    },
    // revalidate: 60 * 60 * 8, // 8 hours
  };
};
