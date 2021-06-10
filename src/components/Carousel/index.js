import Link from "next/link";
import Slider from "react-slick";

import styles from "./Carousel.module.scss";

const settingsCarousel = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel(slideMoviesList) {
  return (
    <section className={styles.carousel}>
      <Slider {...settingsCarousel}>
        {slideMoviesList.el.map((slideMovie) => {
          return (
            <div key={slideMovie.id}>
                <img src={slideMovie.backdrop} />
                
                <div className={styles.caption}>
                    <h2>{slideMovie.title}</h2>
                    <div className={styles.meta}>
                        <span>{slideMovie.rating}</span>
                        {slideMovie.genres.map((genre) => <span>{genre}</span>)}
                        <span>{slideMovie.year}</span>
                        <p>{slideMovie.description}</p>
                    </div>
                    <Link href={`/movie/${slideMovie.id}`} key={slideMovie.id}>
                        Ir
                    </Link>
                </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
