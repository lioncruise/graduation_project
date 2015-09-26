'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumUser', {
    AlbumId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    indexes: [{
      fields: ['AlbumId', 'UserId']
    }, {
      fields: ['UserId', 'AlbumId']
    }]
  });
};