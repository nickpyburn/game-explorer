import React from 'react'
import styles from './SortDropdown.module.css'

interface SortDropdownProps {
  sortOption: string;
  onSortChange: (newSortOption: string) => void;
}

function SortDropdown({ sortOption, onSortChange }: Readonly<SortDropdownProps>) {
  return (
    <select className={styles.dropDown} value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
      <option value="-name">Sort by: Name (Descending)</option>
      <option value="name">Sort by: Name (Ascending)</option>
      <option value="released">Sort by: Release Date (Ascending)</option>
      <option value="-released">Sort by: Release Date (Descending)</option>
      <option value="-added">Sort by: Date Added (Descending)</option>
      <option value="added">Sort by: Date Added (Ascending)</option>
      <option value="-created">Sort by: Creation Date (Descending)</option>
      <option value="created">Sort by: Creation Date (Ascending)</option>
      <option value="-updated">Sort by: Last Updated (Descending)</option>
      <option value="updated">Sort by: Last Updated (Ascending)</option>
      <option value="-rating">Sort by: Rating (Descending)</option>
      <option value="rating">Sort by: Rating (Ascending)</option>
      <option value="-metacritic">Sort by: Metacritic Score (Descending)</option>
      <option value="metacritic">Sort by: Metacritic Score (Ascending)</option>
    </select>
  )
}

export default SortDropdown