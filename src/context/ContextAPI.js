import { createContext, useState, useEffect } from 'react';

import { api } from '../services/api';

import { formatGenre } from '../utils/formatGenre';
import { formatYear } from '../utils/formatYear';

export const ContextAPI = createContext();

export function ContextAPIProvider(props) {

  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedMoviesList, setSearchedMovieList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [hasVideo, setHasVideo] = useState(null);
  const [path, setPath] = useState('null');
  const [flag, setFlag] = useState(false);
  const [movieGenreList, setMovieGenreList] = useState ([]);
  const [currentPage, setCurrentPage] = useState(2);

  const handleSearch = async () => {
    if (searchText !== '') {      
      const response = await api.get(`/search/movie?query=${searchText}`);
      const { results } = response.data;

      setSearchedMovieList(results.map((movie) => {
        const posterURL = "https://image.tmdb.org/t/p/w200";
        const backdropURL = "https://image.tmdb.org/t/p/original";

        return {
          id: movie.id,
          title: movie.title,
          poster: `${posterURL}${movie.poster_path}`,
          backdrop: `${backdropURL}${movie.backdrop_path}`,
          rating: movie.vote_average,
          year: formatYear(movie.release_date),
          genres: formatGenre(movie.genre_ids),
          description: movie.overview,
        }
      }))

      setIsSearched(true);
      setSearchText('');
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const response = await api.get(`/search/movie?query=${searchText || null}`);
      const { results } = response.data;
      const resultsFound = searchText !== '' ? results : [];
      setSuggestions(resultsFound);
    }, 1250)

    return () => clearTimeout(delayDebounceFn)
  },[searchText])
 
  return (
  <ContextAPI.Provider 
    value={{
      searchText,
      setSearchText,
      handleSearch,
      searchedMoviesList,
      isSearched,
      setIsSearched,
      isModalOpen,
      setIsModalOpen,
      hasVideo,
      setHasVideo,
      path,
      setPath,
      flag,
      setFlag,
      movieGenreList,
      setMovieGenreList,
      suggestions,
      currentPage,
      setCurrentPage
    }}>

    {props.children}
  </ContextAPI.Provider>
  )

}
