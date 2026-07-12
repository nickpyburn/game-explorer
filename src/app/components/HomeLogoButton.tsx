import React from 'react'
import styles from './HomeLogoButton.module.css'

function HomeLogoButton({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button className={styles.mainDiv} onClick={onClick}>
      {/* Top Section: Header Track */}
      <div className="d-flex align-items-center justify-content-center">
        <i className={`${styles.icon} bi bi-controller me-2`}></i>
        <h1 className={styles.title}>GAMEVAULT</h1>
      </div>
      <div className={styles.subtitleDiv}>
        <p className="m-0">Powered by</p>
        <a
          href="https://rawg.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          RAWG
        </a>
      </div>
    </button>
  )
}

export default HomeLogoButton