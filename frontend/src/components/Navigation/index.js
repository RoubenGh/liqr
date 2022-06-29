import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session?.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<nav className="navBar2">
				<div className="buttons-container">
					<div>
						<NavLink to="/login" className="button">
							Log In
						</NavLink>
					</div>
					<div className="signup-container">
						<NavLink to="/signup" className="button">
							Sign Up
						</NavLink>
					</div>
				</div>
			</nav>
		);
	}

	return (
		<nav className="navBar">
			<NavLink exact to="/" className="home-button">
				Liqr
			</NavLink>
			<NavLink exact to="/images" className="gallery-button">
				Gallery
			</NavLink>
			{sessionUser ? (
				<NavLink exact to="/upload" className="upload-button">
					Upload
				</NavLink>
			) : (
				<NavLink exact to="/login" className="upload-button"></NavLink>
			)}
			{isLoaded && sessionLinks}
		</nav>
	);
}

export default Navigation;
