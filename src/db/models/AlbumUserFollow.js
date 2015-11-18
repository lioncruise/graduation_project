'use strict';

//相册和用户的关注者多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumUserFollow', {
    AlbumId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    indexes: [],
  });
};
