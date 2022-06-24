import './HomePage.css';
// import { useHistory } from 'react-router-dom';

function HomePage() {
	// const history = useHistory();

	return (
		<div className="tester">
			<section className="home-section">
				<div className="text-container">
					<h2 className="home-h2">Find your inspiration. </h2>
					<p className="home-p">
						Join the Liqr community, home to tens of billions of images
						shared by alcohol enthusiasts.
					</p>
					{/* <button
						className="button-start-for-free"
						onClick={() => history.push('/signup')}
					>
						Start for free
					</button> */}
				</div>
			</section>
		</div>
	);
}
export default HomePage;
