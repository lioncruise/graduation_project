'use strict';

const moment = require('moment');

//相册和用户的关注者多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumUserFollow', {
  }, {
    indexes: [{
      unique: true,
      fields: ['AlbumId', 'UserId'],
    }, {
      fields: ['UserId'],
    },
    ],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'albumuserfollows',
  });
};
