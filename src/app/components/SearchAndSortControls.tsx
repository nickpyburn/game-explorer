import { GameQuery } from '../types/app';
import FilterBadge from './FilterBadge';
import { parentPlatforms } from '../lib/ParentPlatforms';
import styles from './SearchAndSortControls.module.css'
import SearchBar from './SearchBar'
import SortDropdown from './SortDropdown';

interface SearchAndSortControlsProps {
  setSearchText: (text: string) => void;
  setSortOption: (option: string) => void;
  gameQuery: GameQuery;
  onRemoveGenre: (genre: string) => void;
  onRemovePlatform: (id: number) => void;
}

function SearchAndSortControls({ setSearchText, setSortOption, gameQuery, onRemoveGenre, onRemovePlatform }: Readonly<SearchAndSortControlsProps>) {
  return(
    <div className = { styles.controlsWrapper } >
        < div className = { styles.topRow } >
            <SearchBar setSearchText={setSearchText} />
            <SortDropdown sortOption={gameQuery.sortOrder || "-added"} onSortChange={setSortOption} />
        </div>

  {/* Dedicated baseline track exclusively handles filter arrays */ }
  < div className = { styles.filterBadgesContainer } >
  {
    gameQuery.genres.map((genre) => (
      <FilterBadge key={genre} filterText={genre} onRemoveFilter={() => onRemoveGenre(genre)} />
    ))
  }
{
  gameQuery.parentPlatforms.map((platformId) => {
    const platformName = parentPlatforms.find(p => p.id === platformId)?.name;
    return platformName ? <FilterBadge key={platformId} filterText={platformName} onRemoveFilter={() => onRemovePlatform(platformId)} /> : null;
  })
}
        </div >
    </div >
  )
}

export default SearchAndSortControls