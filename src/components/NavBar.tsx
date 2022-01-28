import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/home.svg'
import { ReactComponent as ProfileIcon } from '../assets/account.svg'
import { ReactComponent as TeamIcon } from '../assets/team.svg'
import { ReactComponent as HelpIcon } from '../assets/help.svg'

export const NavBar = () => {
  const constantNavStyle = "w-full flex items-center justify-center";

  function handleActiveClass({ isActive = false }) {
    return `${constantNavStyle} ${
      isActive ? "fill-CTA-400" : "fill-gray-300 dark:fill-gray-600"
    }`;
  }

  return (
    <nav
      className="w-full fixed bottom-0 border-b-2 z-10 border-t-solid border-t-[1px] border-t-gray-400 py-3 bg-gray-100 pb-6 sm:pb-6 md:pb-3 lg:pb-2
    
      dark:bg-gray-900 dark:border-t-gray-700
    
    "
    >
      <ul className="flex justify-evenly items-center w-full md:w-1/2 mx-auto">
        <NavLink className={handleActiveClass} to="/">
          <HomeIcon className="fill-inherit stroke-1" />
        </NavLink>

        <NavLink to="/profile" className={handleActiveClass}>
          <ProfileIcon className="fill-inherit stroke-1" />
        </NavLink>
        <NavLink to="/help" className={handleActiveClass}>
          <HelpIcon className="fill-inherit stroke-1" />
        </NavLink>
        <NavLink to="/team/select" className={handleActiveClass}>
          <TeamIcon className="fill-inherit stroke-1" />
        </NavLink>
      </ul>
    </nav>
  );
};
