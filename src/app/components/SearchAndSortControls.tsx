import styles from './SearchAndSortControls.module.css'
import SearchBar from './SearchBar'

interface SearchAndSortControlsProps {
  setSearchText: (text: string) => void;
}

function SearchAndSortControls({ setSearchText }: Readonly<SearchAndSortControlsProps>) {
  return (
    <div className={styles.mainGrid}>
        <SearchBar setSearchText={setSearchText} />
    </div>
  )
}

export default SearchAndSortControls