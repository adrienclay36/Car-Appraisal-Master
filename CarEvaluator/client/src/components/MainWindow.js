import React from 'react'
import styles from './MainWindow.module.css';
import Navbar from './Navbar/navbar';
const MainWindow = (props) => {
  return (
    <div className={`${styles.heroImage} font-primaryFont`}>
      <Navbar/>
      <div className="w-full">

      {props.children}
      </div>
    </div>
  )
}

export default MainWindow