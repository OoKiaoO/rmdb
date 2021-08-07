import { useState, useEffect, useRef } from 'react';
// no need to import React as we are not returning any JSX
import API from '../API';

//creating an initial State => useful for when you will need to reset it
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};


export const useHomeFetch = () => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // creating an additional state to trigger the load more button functionality by using useEffect
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
  
  // used both for initial render & search
  useEffect(() => {
    setState(initialState); // to clean old results before adding new ones
    fetchMovies(1, searchTerm);
  }, [searchTerm]) 
  // specify [] to have useEffect run only on initial render
  // we include searchTerm in the dependencies array, meaning the useEffect will be triggered every time the searchTerm changes

  // Load More => to be triggered only when isLoadingMore changes 
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page])

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
  // no need to specify state: state to return state itself if it has the same name
  // you can can choose to return only the setter for a specific state
}

// export default useHomeFetch;
