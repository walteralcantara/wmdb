import Link from 'next/link';
import Slider from "react-slick";

import styles from './MovieShelf.module.scss';

export default function MovieShelf(movieShelf) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4
  };

  console.log('MOVIE COMPONENT:', movieShelf.element)

  return (
    <div className={styles.innerMovies}>
      
    <Slider {...settings}>
      {movieShelf.element.map((movie, index) => {
        return (
          <Link href={`./movie/${movie.id}`}>
            <div key={movie.id} className={styles.card__movie}>

              <div className={styles.image__movie}>
                <img className={styles.image__img} src={movie.poster} alt={movie.title} />

                <figcaption className={styles.image__overlay}>
                  <div className={styles.image__rating}>
                    <h4>{movie.rating} / 10</h4>
                  </div>

                  <div className={styles.image__genre}>
                    <h4>{movie.genres[0]}</h4>
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
    // <h1>Shelf</h1>
  );
}
