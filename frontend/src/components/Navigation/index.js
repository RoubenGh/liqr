import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<nav className="navBar">
				<div className='buttons-container'>
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
				Home
			</NavLink>
			{isLoaded && sessionLinks}
		</nav>
	);
}

export default Navigation;
