import './HomePage.css';

function HomePage() {
	const changeBg = () => {
		const images = [
			'url("https://thecocktailsociety.uk/wp-content/uploads/2021/05/bar-bar-spirits-2048x1365.jpg")',
			'url("https://images2.alphacoders.com/109/1093754.jpg")',
			'url("https://motaen.com/upload/wallpapers/2018/07/27/16/55/58072/drinks-beer-alcohol-food.jpg")',
			'url("https://thecocktailsociety.uk/wp-content/uploads/2021/08/five-easy-alcohol-only-cocktails-2048x1365.jpg")',
			'url("http://firesidepublichouse.com/wp-content/uploads/2015/07/beerlist-2048x1365.jpg")',
			'url("https://c.wallhere.com/photos/ec/41/books_leaves_alcohol_bottles_still_life-1478605.jpg!d")',
			'url("https://c.wallhere.com/photos/b4/a2/bottles_alcohol_Dalwhinnie_whisky_glass_drinking_glass_simple_background_Scotch-1960725.jpg!d")',
			'url("https://c.wallhere.com/photos/97/23/vodka_absolut_alcohol_bottles_picture-1087033.jpg!d")',
			'url("https://c.wallhere.com/photos/44/44/wine_cellar_bottles_alcohol_collection_wine_glasses-783260.jpg!d")',
		];
		const section = document.querySelector('section');
		const bg = images[Math.floor(Math.random() * images.length)];
		section.style.backgroundImage = bg;
	};

	setInterval(changeBg, 2000);

	return (
		<div className="tester">
			<section className="home-section">
				<div className='text-container'>
					<h2 className="home-h2">Find your inspiration. </h2>
					<div>
						<p className="home-p">
							Join the Liqr community, home to tens of billions of
							alcohol enthusiasts.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
export default HomePage;
