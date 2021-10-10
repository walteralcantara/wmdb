
import Head from 'next/head';
import { useContext, useEffect } from 'react';

import MoviesList from '../../components/MoviesList';

import { ContextAPI } from '../../context/ContextAPI';

import { hideHeader } from '../../utils/hideHeader';

export default function Genre({ genre }) {

  const { 
    movieGenreList,
    path
  } = useContext(ContextAPI);

  useEffect(() => {
    hideHeader();
  }, [path])

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

