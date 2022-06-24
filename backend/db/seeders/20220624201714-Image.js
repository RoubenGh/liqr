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
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Images', null, {});
	},
};
