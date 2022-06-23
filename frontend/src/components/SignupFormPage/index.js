import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({ email, username, password })
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors([
			'Confirm Password field must be the same as the Password field',
		]);
	};

	return (
		<div className="signup-background-image">
			<form onSubmit={handleSubmit} className="signup-form-container">
				<ul>
					{errors.map((error, idx) => (
						<li className="errors-signup" key={idx}>
							{error}
						</li>
					))}
				</ul>

				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Email"
					className="input-field"
				/>

				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					placeholder="UserName"
					className="input-field"
				/>

				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Password"
					className="input-field"
				/>

				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					placeholder="Confirm Password"
					className="input-field"
				/>
				<div className='signup-button-bgcolor'>
					<button className="button" type="submit">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormPage;
