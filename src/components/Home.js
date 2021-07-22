import React, { useState, useEffect } from 'react'; 
// Config.
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components
// API
import API from '../API';
// Custom Hooks

// Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      // console.log(movies);
      
      // calling state setter with function automatically uses previous state render == prev
      // using double brackets: wrapping curly brackets into round ones to have function return an object!
      setState(prev => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
      }))

    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(1);
  }, []) // specify [] to have useEffect run only on initial render

  console.log(state);

  return <div>Home Page</div>;
};

export default Home;
