import React from 'react'
import styles from './SearchAndSortControls.module.css'
import SearchBar from './SearchBar'

function SearchAndSortControls() {
  return (
    <div className={styles.mainGrid}>
        <SearchBar />
    </div>
  )
}

export default SearchAndSortControls