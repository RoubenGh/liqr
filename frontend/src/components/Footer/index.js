import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<div className="footer-bar">
			<a
				className="icon-button"
				href="https://github.com/RoubenGh"
				target="_blank"
			>
				<FontAwesomeIcon icon={faGithub} />
			</a>
			<a
				className="icon-button"
				href="https://www.linkedin.com/in/rouben-ghambaryan-35ba30157/"
				target="_blank"
			>
				<FontAwesomeIcon icon={faLinkedin} />
			</a>
		</div>
	);
};

export default Footer;
