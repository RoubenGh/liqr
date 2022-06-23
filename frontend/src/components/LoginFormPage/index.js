import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	return (
		<div className='background-image'>
			<form className="loginform-container" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className="errors" key={idx}>
							{error}
						</li>
					))}
				</ul>

				<input
					type="text"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
					placeholder="Username or Email"
				/>

				<div className="login-password-container">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</div>
				<button className="login-button" type="submit">
					Log In
				</button>
			</form>
		</div>
	);
}

export default LoginFormPage;
