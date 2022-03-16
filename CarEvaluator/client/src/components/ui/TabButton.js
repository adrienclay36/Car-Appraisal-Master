import React from 'react'
import { Link } from 'react-router-dom';
const TabButton = ({ buttonText, href, width}) => {
    const xs = 'w-1/6';
    const sm = 'w-2/6';
    const md = 'w-3/6';
    const lg = 'w-5/6';
    const full = 'w-full';
    let chosenWidth;

    switch(width) {
        case('xs'):
            chosenWidth = xs;
            break;
        case('sm'):
            chosenWidth = sm;
            break;
        case('md'):
            chosenWidth = md;
            break;
        case ('lg'):
            chosenWidth = lg;
            break;
        case('full'):
            chosenWidth = full;
            break;
        default:
            chosenWidth = md;
            break;
    }
  return (
    <div className="text-center mt-8">
      <Link to={href}>
        <button
          className={`text-center text-white uppercase border-2 p-4 border-r-8 hover:bg-white hover:text-black ${chosenWidth}`}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

export default TabButton