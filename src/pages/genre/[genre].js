
import Head from 'next/head';
import { useContext } from 'react';

import MoviesList from '../../components/MoviesList';
import { ContextAPI } from '../../context/ContextAPI';

export default function Genre({ genre }) {

  const { movieGenreList } = useContext(ContextAPI);

  return (
    <>
      <Head>
        <title>WMDB - {genre.genre}</title>
      </Head>

      <MoviesList 
        title={`${genre.genre}`} 
        movieList={movieGenreList} 
      />

    </>
  );
}

export async function getStaticPaths() {

  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps(ctx) {

  const genre = ctx.params;
  
  return {
    props: {
      genre: genre,
    },
  };
}

