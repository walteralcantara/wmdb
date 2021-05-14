import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'd98980b6f729b75d3b64c9e86c4e45fa',
    language: 'pt-BR',
  },
})
