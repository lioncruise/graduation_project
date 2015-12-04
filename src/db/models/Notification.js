'use strict';

const moment = require('moment');

//推送
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    content: {
      type: DataTypes.STRING,
    },
  }, {
    indexes: [],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
  });
};
