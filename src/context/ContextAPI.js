import {createContext, useState, ReactNode, useContext} from 'react';
import { api } from '../services/api';



export const ContextAPI = createContext();

export function ContextAPIProvider(props) {

  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([]);

  const handleSearch = async () => {
    if (searchText !== '') {      
      const response = await api.get(`/search/movie?query=${searchText}`);
      setMovieList(response.data)
      console.log('movieList:', movieList);
    }
  }
 
  return (
  <ContextAPI.Provider 
    value={{searchText, setSearchText, handleSearch, movieList}}>

    {props.children}
  </ContextAPI.Provider>
  )

}
