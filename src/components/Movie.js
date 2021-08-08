import React from 'react';
import { useParams } from 'react-router-dom'; // hook that will allow us to extract params contained inside urls
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import Grid from './Grid';
import Spinner from './Spinner';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';


const Movie = () => {
  const { movieId } = useParams(); // it needs to be called exactly the same as the param included inside App.js > Route path component!!
  const { state: movie, loading, error } = useMovieFetch(movieId);  // destructuring properties exported from hook & renaming state

  console.log(movie);
  return (
    <>
      <div>Movie</div>
    </>
  )
}

export default Movie;
