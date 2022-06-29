import './HomePage.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomePage() {
	const sessionUser = useSelector((state) => state.session?.user);
	return (
		<div className="tester">
			<section className="home-section">
				<div className="text-container">
					<NavLink exact to="/images" className="home-h2">
						Click to View Collection
					</NavLink>
					{!sessionUser ? (
						<p className="home-p">
							Join the Liqr community, home to tens of billions of images
							shared by alcohol enthusiasts.
						</p>
					) : (
						<p className='home-p'>Haiiiii</p>
					)}
				</div>
			</section>
		</div>
	);
}
export default HomePage;
