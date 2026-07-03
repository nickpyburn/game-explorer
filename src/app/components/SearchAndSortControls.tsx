import styles from './SearchAndSortControls.module.css'
import SearchBar from './SearchBar'
import SortDropdown from './SortDropdown';

interface SearchAndSortControlsProps {
  setSearchText: (text: string) => void;
  setSortOption: (option: string) => void;
  sortOption?: string;
}

function SearchAndSortControls({ setSearchText, setSortOption, sortOption }: Readonly<SearchAndSortControlsProps>) {
  return (
    <div className={styles.mainGrid}>
        <SearchBar setSearchText={setSearchText} />
        <SortDropdown sortOption={sortOption || "-added"} onSortChange={setSortOption} />
    </div>
  )
}

export default SearchAndSortControls