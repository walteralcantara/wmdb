import { useEffect, useState } from 'react';
import { api }from '../../services/api'


import styles from './AsideMenu.module.scss'

export default function AsideMenu() {

  const [fetchGenre, setFetchGenre] = useState(null);

  useEffect(() => {
    async function fetchGenres(){
      const response = await api.get('genre/movie/list', {
          params : {
          api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
          language: 'pt-BR',
        }
      })

      setFetchGenre(response);
    }
    
    fetchGenres()
  },[])

  return (
    <aside className={styles.asideContainer}>
      <ul>
        
        {fetchGenre?.data.genres.map((genre) => {
          return(
            <li key={genre.id}>
              <a href="#">{genre.name}</a>
            </li>
          )
        })}
      </ul>
    </aside>
  );
}
