import React from 'react'; 
// Config.
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
// API
import API from '../API';
// Custom Hooks
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
  const { state, loading, error, setSearchTerm } = useHomeFetch();

  console.log(state);

  return (
    <>
      {state.results[0] &&
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      }
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header='Popular Movies' >
        {state.results.map(movie => (
          <Thumb 
            key={movie.id}
            clickable // defaults to true
            image={movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              : NoImage}
            movieId = {movie.id}
          />
        ))}
      </Grid>
      <Spinner />
    </>
  );
};

export default Home;
