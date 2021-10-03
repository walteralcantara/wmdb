import React from "react";
import Link from "next/link";

import { useContext } from "react";
import { ContextAPI } from "../../context/ContextAPI";

import { formatYear } from "../../utils/formatYear";
import { formatGenre } from "../../utils/formatGenre";

import styles from './Suggestions.module.scss';

export default function Suggestions() {
  const { suggestions, searchText } = useContext(ContextAPI);
    

  if(searchText === '' || suggestions.length <= 0) {
    return ([])
  }

  return (
    suggestions && <div className={styles.suggestions}>
      {suggestions.map((suggestion) => (
        <a 
          className={styles.suggestion}
          href={`/movie/${suggestion.id}`}
          key={suggestion.id}
        >
          <div className="poster">
            <img 
            src={`https://image.tmdb.org/t/p/w200${suggestion.poster_path}`} 
            alt={suggestion.title}
          />
          </div>
          
          <div className="info">
            <p className="title">{suggestion.title}</p>
            <div className="meta">
              <span className="year">
                {formatYear(suggestion.release_date)}
              </span>
              <span>
                {suggestion.vote_average}
              </span>
              <span>
                {formatGenre(suggestion.genre_ids).slice(0, 1)}
              </span>
            </div>
          </div>
        </a>
      )).slice(0, 4)}
    </div>
  )
}