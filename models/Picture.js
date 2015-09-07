'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Picture', {
    likeNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    pictureUrl: {
        type: DataTypes.STRING
    },
    shareNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

