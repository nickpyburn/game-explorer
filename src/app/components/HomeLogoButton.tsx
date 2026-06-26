import React from 'react'
import styles from './HomeLogoButton.module.css'

function HomeLogoButton({onClick}: Readonly<{onClick: () => void}>) {
  return (
    <button className={styles.mainDiv} onClick={onClick}>
        <i className={`${styles.icon} bi bi-controller`}></i>
        <h1 className={styles.title}>GAMEVAULT</h1>
    </button>
  )
}

export default HomeLogoButton