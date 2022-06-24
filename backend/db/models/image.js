'use strict';
module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define(
		'Image',
		{
			userId: { type: DataTypes.INTEGER, allowNull: false },
			imageUrl: { type: DataTypes.STRING(255), allowNull: false, unique: true },
			title: { type: DataTypes.STRING(75), allowNull: false },
			content: { type: DataTypes.STRING(255), allowNull: true },
		},
		{}
	);

	Image.associate = function (models) {
		// associations can be defined here+
		Image.belongsTo(models.User, { foreignKey: 'userId' });
		Image.hasMany(models.Comment, { foreignKey: 'imageId' });
	};
	return Image;
};
