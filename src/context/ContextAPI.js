import {createContext, useState, ReactNode, useContext} from 'react';
import { api } from '../services/api';



export const ContextAPI = createContext();

export function ContextAPIProvider(props) {

  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [searchedMoviesList, setSearchedMovieList] = useState([]);

  const handleSearch = async () => {
    if (searchText !== '') {      
      const response = await api.get(`/search/movie?query=${searchText}`);
      
      setSearchedMovieList(response.data.results)
      setIsSearched(true);
      // console.log('contextMovieList:', movieList);
    }
  }
 
  return (
  <ContextAPI.Provider 
    value={{searchText, setSearchText, handleSearch, searchedMoviesList, isSearched, setIsSearched}}>

    {props.children}
  </ContextAPI.Provider>
  )

}
