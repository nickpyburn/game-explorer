import React from 'react'
import styles from './SideBar.module.css'
import HomeLogoButton from './HomeLogoButton'

function SideBar() {
  return (
    <div className={styles.mainDiv}>
        <HomeLogoButton onClick={() => console.log("Home button clicked")} />
    </div>
  )
}

export default SideBar