'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Images',
			[
				{
					userId: 1,
					imageUrl:
						'https://d3ga14us2qctk8.cloudfront.net/wp-content/uploads/2014/08/Casa-Dragones-Joven-tequila_MOBILE1.jpg',
					title: 'Dos Dragones',
					content: '',
				},
				{
					userId: 2,
					imageUrl:
						'https://dydza6t6xitx6.cloudfront.net/ci-johnnie-walker-white-walker-blended-scotch-whisky-e4e5ca7f1085d2b4.jpeg',
					title: 'White Walker by Johnnie Walker',
					content:
						'In my opinion this is the best product Johnnie Walker has put out',
				},
				{
					userId: 1,
					imageUrl:
						'https://dydza6t6xitx6.cloudfront.net/ci-stolichnaya-vodka-a4b9144f2f7f66e0.jpeg',
					title: 'Stolichnaya',
					content: '',
				},
				{
					userId: 4,
					imageUrl: "https://lavialactea1979.com/wp-content/uploads/2020/10/aguardiente-antioqueno-tapa-azul-sin-azucar.jpg",
					title: 'Aguardiente Antioqueño Tapa Azul',
					content: "Known as Colombia's national alcoholic beverage, Aguardiente translates literally to 'firewater' mostly due to the fact that it is made from molasses, honey anise.Typically drank straight by the locals, Antioqueno Aguardiente can also be taken as a shot or utilized as a creative ingredient in many beverages.",
				},
				{
					userId: 5,
					imageUrl: 'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h11/h07/12477612392478.png',
					title: 'Franzia Sauvignon Blanc',
					content: "I'm not proud of it myself, but it tastes good I promise!",
				},
				{
					userId: 5,
					imageUrl: 'https://liquorpei.com/wp-content/themes/peiliquor/bottle-shots/17910Z.jpg',
					title: 'Smirnoff Ice',
					content: "The perfect college drink",
				},
				{
					userId: 5,
					imageUrl: 'https://dydza6t6xitx6.cloudfront.net/ci-svedka-blue-raspberry-vodka-dc9a8da4dad00618.jpeg',
					title: 'SVEDKA Blue Raspberry',
					content: "",
				},
				{
					userId: 5,
					imageUrl: 'https://dydza6t6xitx6.cloudfront.net/ci-hennessy-vs-cognac-4386a392a6b94b18.jpeg',
					title: 'Hennessy V.S.',
					content: "",
				},
				{
					userId: 4,
					imageUrl: 'https://shop.coopershawkwinery.com/images/P/passion-fruit.jpg',
					title: "Cooper's Hawk Passion Fruit Wine",
					content: "If you don't love it, I promise your lady will.",
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Images', null, {});
	},
};
