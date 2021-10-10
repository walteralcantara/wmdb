import Link from 'next/link';
import Slider from "react-slick";

import RatingIcon from '../../assets/icons/rating.svg'

import styles from './MoviesShelf.module.scss';

export default function MoviesShelf({ title, movieShelf }) {
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "60px",
        }
      }
    ]
  };
  
  if(movieShelf.length <= 0) {
    return (
      <h1 className={styles.noSimilarMovies}>
        Desculpe, mas não há filmes similares no momento :(
      </h1>
    );
  }

  return (
    <div className={styles.innerMovies}>
      
      {title && (
        <h2 className={styles.title}>
          {title}
        </h2>
      )}

      <Slider {...settings}>
        {movieShelf.map((movie) => {
          return (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
            >
              <div className={styles.card__movie}>
                <div className={styles.image__movie}>
                  <img
                    className={styles.image__img}
                    src={movie.poster}
                    alt={movie.title}
                    loading="lazy"
                  />

                  <figcaption className={styles.image__overlay}>
                    <div className={styles.image__rating}>
                      <i>
                        <RatingIcon />
                      </i>
                      <h4>{movie.rating} / 10</h4>
                    </div>

                    <div className={styles.image__genre}>
                      <h4>{movie.genres[0]} </h4>
                      <h4>{movie.genres[1]}</h4>
                    </div>

                    <span className={styles.button__details}>Ver Detalhes</span>
                  </figcaption>
                </div>
                <strong className={styles.movie__title}>{movie.title}</strong>
                <p className={styles.movie__year}>{movie.year}</p>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
