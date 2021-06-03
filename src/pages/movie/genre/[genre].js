
import Head from 'next/head';

export default function Genre({ genre }) {
  console.log(genre)

  return (
    <>
    <Head>
      <title>WMDB - {genre.genre}</title>
    </Head>

    <div>
        <h1>genre {genre.genre}</h1>
    </div>
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

