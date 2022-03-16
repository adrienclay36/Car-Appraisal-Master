import React, { useState } from "react";
import MobileNav from "./mobile-nav";
import { Burger } from "@mantine/core";
import styles from "./navbar.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const hideLogo = useMediaQuery("(max-width: 1024px)");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsInitial(false);

    props.onOpen();
  };
  return (
    <div>
      <nav
        className={`container ${styles.testBackground} ${
          props.classes
        } flex flex-col items-center py-4 ${props.marginTop && "sm:mt-12"}`}
      >
        <div className="mt-8">
          <p className="text-white text-5xl font-extrabold">pricepoint.</p>
        </div>
        <ul
          className={`hidden sm:flex flex-1 flex-wrap lg:flex-nowrap md:flex-wrap justify-center  items-center gap-6 lg:gap-10 md:gap-6 uppercase text-sm mt-8 text-semibold overflow-hidden ${props.textColor}`}
        >
          {navLinks.map((link, index) => {
            return (
              <Link key={index} to={link.href}>
              <li
                className={`mb-2 cursor-pointer tracking-widest text-white font-semibold text-md lg:text-xl md:text-lg hover:text-slate-100 text-center ${styles.navHover}`}
                >
                {link.text}
              </li>
                </Link>
            );
          })}
        </ul>
        <div className="flex sm:hidden flex-1 justify-end mr-3">
          <Burger
            size={30}
            opened={isOpen}
            color="white"
            onClick={toggleMenu}
          />
        </div>
      </nav>
      <div className="sm:hidden md:block lg:block">
        <MobileNav
          textColor={props.textColor}
          isOpen={isOpen}
          className={styles.menuSlide}
          navLinks={navLinks}
          inverted={props.inverted}
        />
      </div>
    </div>
  );
};

export default Navbar;

export const navLinks = [
  {
    text: "Evaluator",
    href: "/",
  },
  {
    text: "About",
    href: "/blog",
  },
  {
    text: "Github",
    href: "/blog",
  },
];
