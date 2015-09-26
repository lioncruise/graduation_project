'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    type: {
      type: DataTypes.ENUM('C', /*评论*/ 'L', /*点赞*/ 'B' /*推送通知*/ )
    },
    content: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      fields: ['TargetUserId', 'createdAt', 'id']
    }, {
      fields: ['id']
    }]
  });
};