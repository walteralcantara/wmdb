import Head from 'next/head';
import { useEffect } from 'react';
import axios from 'axios';

import { api } from '../services/api'

import styles from './Home.module.scss';

export default function Home() {

  return (
    <div className={styles.homePage}>

      <section className={styles.movies}>

      </section>

    </div>
  );

}


export const getServerSideProps = async () => {

  // const res = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=d98980b6f729b75d3b64c9e86c4e45fa&language=pt-BR');

  // const json = await res.json();

  const response = await api.get('trending/movie/week', {
    params : {
      api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
      language: 'pt-BR',
    }
  })

  console.log(response.data.results[0]);

  return {
    props: {
      // list: json.results,
    }
  }

}