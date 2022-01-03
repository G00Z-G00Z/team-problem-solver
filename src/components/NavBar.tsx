import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/home.svg'
import { ReactComponent as ProfileIcon } from '../assets/account.svg'
import { ReactComponent as TeamIcon } from '../assets/team.svg'
import { ReactComponent as HelpIcon } from '../assets/help.svg'

export const NavBar = () => {
  const constantNavStyle = "";

  function handleActiveClass({ isActive = false }) {
    return `${constantNavStyle} ${isActive ? "fill-CTA-400" : "fill-gray-300"}`;
  }

  return (
    <nav className="w-full fixed bottom-0 border-b-2 z-10 border-t-solid border-t-[1px] border-t-gray-400 py-3 bg-gray-100">
      <ul className="flex justify-evenly">
        <li>
          <NavLink className={handleActiveClass} to="/">
            <HomeIcon className="fill-inherit stroke-1" />
          </NavLink>
        </li>
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
