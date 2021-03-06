'use strict';

const moment = require('moment');

//用户和用户之间的关注关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserUserFollow', {
  }, {
    indexes: [{
      unique: true,
      fields: ['UserId', 'TargetUserId'],
    }, {
      fields: ['TargetUserId'],
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
    tableName: 'useruserfollows',
  });
};
