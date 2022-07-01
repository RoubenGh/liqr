import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage/';
import Images from './components/Images';
import SingleImage from './components/SingleImage';
import UploadImage from './components/UploadImage';
import EditImage from './components/EditImage';
import { NavLink } from 'react-router-dom';
import './404.css';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route exact path="/signup">
						<SignupFormPage />
					</Route>
					<Route exact path="/images">
						<Images />
					</Route>
					<Route exact path="/images/:id">
						<SingleImage />
					</Route>
					<Route exact path="/upload">
						<UploadImage />
					</Route>
					<Route exact path="/images/:id/edit">
						<EditImage />
					</Route>
					<Route>
						<div className="tester">
							<div className="not-found-img">
								<div>
									<NavLink exact to='/' className="sorry-text">
										Sorry, you've been cut off,
									would you like to go Home?
									</NavLink>
								</div>
							</div>
						</div>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
