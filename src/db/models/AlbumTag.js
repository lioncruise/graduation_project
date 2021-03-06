'use strict';

const moment = require('moment');

//相册和标签的多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumTag', {
    AlbumId: {
      type: DataTypes.INTEGER,
    },
    TagId: {
      type: DataTypes.INTEGER,
    },
  }, {
    indexes: [{
      fields: ['AlbumId'],
    }, {
      fields: ['TagId'],
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
    tableName: 'albumtags',
  });
};
