import React, { useContext, useEffect, useRef, useState } from 'react';
import { ContextAPI } from '../../context/ContextAPI';

import { api } from "../../services/api";

import { formatYear } from "../../utils/formatYear";
import { formatGenre } from "../../utils/formatGenre";

import MoviesList from '../MoviesList';

export default function InfiniteScroll() {

  const [moviesArray, setMoviesArray] = useState([])

  const { 
    currentPage,
    setCurrentPage
  } = useContext(ContextAPI);

  const containerRef = useRef();

  const scroll = () => {
    window.scrollTo(0, (window.scrollY));
  }

  const fetchMore = async () => {
    const trending = await api.get("trending/movie/day", {
      params: {
        page: currentPage
      }
    });
    const { results } = trending.data;

    const formatResults = results.map((movie) => {
      const posterURL = "https://image.tmdb.org/t/p/w200";
      const backdropURL = "https://image.tmdb.org/t/p/original";

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

    setMoviesArray([...moviesArray, {
      id: moviesArray.length,
      formatResults
    }]);
    scroll();
    setCurrentPage(prevState => prevState + 1);
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.99,
    }

    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        observer.disconnect();
        
        fetchMore();
      }
    }, options);

    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    }
  }, [currentPage])

  if(!moviesArray) {
    return <div>loading...</div>
  }

  return (
    <>
      {moviesArray.length > 0 && (
        moviesArray.map((item, index) => (
          <MoviesList
            key={index}
            movieList={moviesArray[index].formatResults}
          />
        ))
      )}

      <div ref={containerRef}>
        loading...
      </div>
    </>
  )
}