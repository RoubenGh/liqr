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
						<h1> Sorry, you've been cut off.</h1>
						<img src="https://www.communitycare.com/DynamicFile/Alcohol-Awareness-Month-Blog-1200x600.png" />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
