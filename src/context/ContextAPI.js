import {createContext, useState, ReactNode, useContext} from 'react';
import { api } from '../services/api';
import { formatGenre } from '../utils/formatGenre';
import { formatYear } from '../utils/formatYear';



export const ContextAPI = createContext();

export function ContextAPIProvider(props) {

  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedMoviesList, setSearchedMovieList] = useState([]);
  const [hasVideo, setHasVideo] = useState(null);
  const [path, setPath] = useState('null');
  const [flag, setFlag] = useState(false);
  const [movieGenreList, setMovieGenreList] = useState ([]);

  const handleSearch = async () => {
    if (searchText !== '') {      
      const response = await api.get(`/search/movie?query=${searchText}`);
      
      setSearchedMovieList(response.data.results.map((movie) => {
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
      console.log('searchText', searchText);
    }
  }
 
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
    }}>

    {props.children}
  </ContextAPI.Provider>
  )

}
