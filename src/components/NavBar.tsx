import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as ProfileIcon } from "../assets/account.svg";
import { ReactComponent as TeamIcon } from "../assets/team.svg";
import { ReactComponent as HelpIcon } from "../assets/help.svg";

export const NavBar = () => {
	return (
		<nav className="w-full bg-gray-200 fixed bottom-0 border-b-2 font-sans text-2xl z-10">
			<ul className="flex justify-evenly">
				<Link to="/" className="">
					<HomeIcon className="fill-CTA-400" />
				</Link>
				<Link to="/profile">
					<ProfileIcon className="fill-CTA-400" />
				</Link>
				<Link to="/help">
					<HelpIcon className="fill-CTA-400" />
				</Link>
				<Link to="/team/select">
					<TeamIcon className="fill-CTA-400" />
				</Link>
			</ul>
		</nav>
	);
};
