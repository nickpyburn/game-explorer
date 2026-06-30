import React from 'react'
import styles from './SearchBar.module.css'

function SearchBar() {
  return (
    <div className={styles.mainDiv}>
        <input type="text" placeholder="Search Games..." className={styles.searchInput} />
        <i className={`bi bi-search ${styles.searchIcon}`}></i>
    </div>
  )
}

export default SearchBar