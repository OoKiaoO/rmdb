import { useState, useEffect } from "react";
import API from '../API';
import { isPersistedState } from '../helpers';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({}); // empty object as default value
  const [loading, setLoading] = useState(true); // default to true cause this component is going to start be fetching data for the movie
  const [error, setError] = useState(false);

  useEffect(() => {
    // placing async function inside useEffect otherwise it will think it is a new function on each render and will create infinite loop!
    // to be able to have the func outside you need to use the useCallback hook, in case you need to use the function somewhere else
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        // logic to filter out director name only from credits
        const directors = credits.crew.filter(
          member => member.job === 'Director'
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors // ES6 syntax > no need to specify directors if it matches previously defined variable~!
        });

        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }

    const sessionState = isPersistedState(movieId);
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return; // early return to prevent to run the below function to make te API call
    }

    fetchMovie();
  }, [movieId]);

  // write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state])

  return { state, loading, error };
}