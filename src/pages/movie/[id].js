import Head from 'next/head';
import Link from 'next/link';

import { api } from '../../services/api';

import styles from '../movie/movie.module.scss';

export default function MovieItem({ responseData, movieInfo }) {

    console.log(responseData)
    console.log(movieInfo)


  return (
    <div>{movieInfo.title}</div>
  );
}


export async function getServerSideProps(ctx) {

    const movie = ctx.params;

    console.log(`movie/${movie.id}`)

    const response = await api.get(`movie/${movie.id}`, {
        params : {
            api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
            language: 'pt-BR',
        }
    })  

    console.log(response.data)

    const movieInfo = {
        id: response.data.id,
        title: response.data.title,
    }

    const responseData = response.data;

//   const res = await fetch(
//     `http://localhost:3000/api/movie/${context.params.id}`,
//   );
//   const json = await res.json();
//   console.log(json);

  return {
    props: {
        responseData: responseData,
        movieInfo: movieInfo,
    },
  };
}

