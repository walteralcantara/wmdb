export function formatGenre(genres){
    const formatGenre = []

    genres.map(genre__id => {
        if(genre__id == 28)
            formatGenre.push('Ação');
        if(genre__id == 12)
            formatGenre.push('Aventura');
        if(genre__id == 16)
            formatGenre.push('Animação');
        if(genre__id == 35)
            formatGenre.push('Comédia');
        if(genre__id == 80)
            formatGenre.push('Crime');
        if(genre__id == 99)
            formatGenre.push('Documentário');
        if(genre__id == 18)
            formatGenre.push('Drama');
        if(genre__id == 10751)
            formatGenre.push('Família');
        if(genre__id == 14)
            formatGenre.push('Fantasia');
        if(genre__id == 36)
            formatGenre.push('História');
        if(genre__id == 27)
            formatGenre.push('Terror');
        if(genre__id == 10402)
            formatGenre.push('Música');
        if(genre__id == 9648)
            formatGenre.push('Mistério');
        if(genre__id == 10749)
            formatGenre.push('Romance');
        if(genre__id == 878)
            formatGenre.push('Ficção Científica');
        if(genre__id == 10770)
            formatGenre.push('Filme TV');
        if(genre__id == 53)
            formatGenre.push('Thriller');
        if(genre__id == 10752)
            formatGenre.push('Guerra');
        if(genre__id == 37)
            formatGenre.push('Oeste');
    })
    return formatGenre;
  }