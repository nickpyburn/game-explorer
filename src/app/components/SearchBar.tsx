"use client";

import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

function SearchBar({ searchText, setSearchText }: Readonly<SearchBarProps>) {
  const [inputValue, setInputValue] = useState(searchText);
  const [previousSearchText, setPreviousSearchText] = useState(searchText);

  if (searchText !== previousSearchText) {
    setPreviousSearchText(searchText);
    setInputValue(searchText);
  }

  useEffect(() => {
    if (inputValue === searchText) {
      return;
    }

    if (inputValue.length > 0 && inputValue.length < 3) {
      return;
    }

    const delayDebounceTimer = setTimeout(() => {
      setSearchText(inputValue);
    }, 500);

    return () => clearTimeout(delayDebounceTimer);
  }, [inputValue, searchText, setSearchText]);

  return (
    <div className={styles.mainDiv}>
      <input
        type="text"
        placeholder="Search Games..."
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <i className={`bi bi-search ${styles.searchIcon}`}></i>
    </div>
  );
}

export default SearchBar;