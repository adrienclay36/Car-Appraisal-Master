import React, { useState } from "react";
import MobileNav from "./mobile-nav";
import { Burger } from "@mantine/core";
import styles from "./navbar.module.css";
import { useMediaQuery } from "@mantine/hooks";
import SubMenu from "./sub-menu";
const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const hideLogo = useMediaQuery('(max-width: 1024px)');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsInitial(false);

    props.onOpen();
  };
  return (
    <div>
      
      <nav
        className={`container ${props.classes} flex items-center py-4 ${
          props.marginTop && "sm:mt-12"
        }`}
      >
        {/* {!hideLogo && <Link href="/" passHref>
          <div className={`py-1 ${props.invertImage && "invert"}`}>
            <LogoUnited />
          </div>
        </Link>} */}
        <ul
          className={`hidden sm:flex flex-1 flex-wrap lg:flex-nowrap md:flex-wrap justify-center lg:justify-end md:justify-center items-center gap-6 lg:gap-10 md:gap-6 uppercase text-sm mt-2 text-semibold overflow-hidden ${props.textColor}`}
        >
          {navLinks.map((link) => {
            if (!link.subNav) {
              return (
               
                  <li className="mb-2 cursor-pointer tracking-widest hover:text-slate-200 text-center">
                    {link.text}
                  </li>
              
              );
            }
            // if (link.subNav) {
            //   return (
            //     <SubMenu
            //       size={link.size}
            //       key={link.text}
            //       control={
            //         <button onClick={() => router.push(link.href)} className="mb-2 cursor-pointer tracking-widest hover:text-slate-200 text-center uppercase">
            //           {link.text}
            //         </button>
            //       }
            //       items={link.items}
            //     />
            //   );
            // }
          })}
        </ul>
        <div className="flex sm:hidden flex-1 justify-end mr-3">
          <Burger size={30} opened={isOpen} color="white" onClick={toggleMenu} />
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
    text: "Blog",
    href: "/blog",
  },
];
