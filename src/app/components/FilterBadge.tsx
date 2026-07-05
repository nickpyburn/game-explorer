import styles from './FilterBadge.module.css'

interface FilterBadgeProps {
  filterText: string;
  onRemoveFilter: () => void;
}

function FilterBadge({ filterText, onRemoveFilter }: Readonly<FilterBadgeProps>) {
  return (
    <div className={styles.mainDiv}>
        <span className={styles.filterText}>{filterText}</span>
        <button className="btn-close btn-close-white btn-sm" aria-label="Remove Filter" onClick={onRemoveFilter}></button>
    </div>
  )
}

export default FilterBadge