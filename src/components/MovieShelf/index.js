import Link from 'next/link';
import Slider from "react-slick";

import { useEffect, useState } from 'react'

import styles from './MovieShelf.module.scss';

export default function MovieShelf(movieShelf) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4
  };

  const [isPath, isSetPath] = useState(null);
  
  useEffect(() => {
    isSetPath(window.location.pathname);
    
    console.log('isPath:',isPath)
  }, [])

  return (
    <div className={styles.innerMovies}>
      
    <Slider {...settings}>
      {movieShelf.element.map((movie, index) => {
        return (
          <Link href={isPath == '/' ? `./movie/${movie.id}` : `./${movie.id}`} key={movie.id}>
            <div className={styles.card__movie}>

              <div className={styles.image__movie}>
                <img className={styles.image__img} src={movie.poster} alt={movie.title} />

                <figcaption className={styles.image__overlay}>
                  <div className={styles.image__rating}>
                    <h4>{movie.rating} / 10</h4>
                  </div>

                  <div className={styles.image__genre}>
                    <h4>{movie.genres[0]} </h4>
                    <h4>{movie.genres[1]}</h4>
                  </div>

                  <span className={styles.button__details}>
                    Ver Detalhes
                  </span>

                </figcaption>
              </div>
              <strong className={styles.movie__title}>{movie.title}</strong>
              <p className={styles.movie__year}>{movie.year}</p>
            </div>
          </Link>
        )
      })}
    </Slider>
  </div>
  );
}
