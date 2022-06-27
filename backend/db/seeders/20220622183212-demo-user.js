'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'demo@user.io',
					username: 'Demo-lition',
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					email: 'user1@user.io',
					username: 'FakeUser1',
					hashedPassword: bcrypt.hashSync('password2'),
				},
				{
					email: 'user2@user.io',
					username: 'FakeUser2',
					hashedPassword: bcrypt.hashSync('password3'),
				},
				{
					email: 'colombiaman@user.io',
					username: 'DrinkzAlot',
					hashedPassword: bcrypt.hashSync('password4'),
				},
				{
					email: 'str8fromBay@user.io',
					username: 'Lil Rice Farm',
					hashedPassword: bcrypt.hashSync('password5'),
				},
				{
					email: 'badmittongod@user.io',
					username: 'fluffyman',
					hashedPassword: bcrypt.hashSync('password5'),
				}

			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
			},
			{}
		);
	},
};
