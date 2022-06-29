'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Comments',
			[
        {
          userId: 1,
					imageId: 1,
          comment: "I wonder if they have a reposado of this"
				},
        {
          userId: 4,
          imageId: 2,
          comment: "I can't belive they actually made a Game of Thrones bottle.",
        },
        {
          userId: 4,
          imageId: 2,
          comment: "It would be even cooler if they made bottles with all the Houses",
        },
        {
          userId: 2,
          imageId: 6,
          comment: "So true, I drank so much of this in college!",
        },
        {
          userId: 1,
          imageId: 9,
          comment: "It's unfortunate I wish there was a Cooper's Hawk here",
        },
        {
          userId: 2,
          imageId: 1,
          comment: 'This is actually my favorite tequila!',
        },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Comments', null, {});
	},
};
