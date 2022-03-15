import React from "react";

import styles from './mobile-nav-item.module.css'
const MobileNavItem = (props) => {
  return (
    <>
     
        <li
          className={`my-4 font-light tracking-widest`}
        >
          {props.children}
        </li>
  
      <hr className="border-b" />
    </>
  );
};

export default MobileNavItem;
