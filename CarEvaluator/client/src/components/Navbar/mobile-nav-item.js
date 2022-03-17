import React from "react";

import styles from './mobile-nav-item.module.css'
import { Link } from "react-router-dom";
const MobileNavItem = (props) => {
  return (
    <>
        <Link to={props.href}>
        <li
          className={`my-4 tracking-widest text-white font-bold`}
          >
          {props.children}
        </li>
  
      <hr className="border-b" />
          </Link>
    </>
  );
};

export default MobileNavItem;
