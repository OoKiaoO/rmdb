import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// Images
import searchIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.styles';

// making SearchBar a controlled component => the input value is going to control the component's state: input value == component's state
const SearchBar = ({ setSearchTerm }) => {
  const [ state, setState ] = useState('');
  const initial = useRef(true);

  // useEffect always trigger on mount, but we don't want to trigger a fetch as soon as the searchbar mounts => useRef()
  useEffect(() => {
    // to skip useEffect on initial render
    if (initial.current) {
      initial.current = false;
      // no need to use a setter for useRef and it won't trigger a re-render to change it.
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500)

    return () => clearTimeout(timer)
    // using return function in useEffect to trigger clean up of timer: it triggers after every render is finished.
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt='search-icon' />
        <input 
          type='text'
          placeholder='Search movie'
          onChange={event => setState(event.currentTarget.value)}
          value={state}
          />
      </Content>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  callback: PropTypes.func
}

export default SearchBar;
