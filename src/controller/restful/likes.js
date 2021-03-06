'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');
const config = require('../../config');

exports.create = function*() {
  this.verifyParams({
    type: 'string',
    MemoryId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    AlbumId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  });

  const existLike = yield models.Like.find({
    where: {
      UserId: this.session.user.id,
      MemoryId: this.request.body.MemoryId,
    },
  });
  if (existLike) {
    this.body = {
      statusCode: 403,
      message: '用户已对记忆点过赞',
    };
    return;
  }

  const like = yield models.Like.create(Object.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  //冗余数据＋1
  yield models.Album.update({
    likesCount: sequelize.literal('likesCount + 1'),
  }, {
    where:{
      id: this.request.body.AlbumId,
    },
  });
  yield models.Memory.update({
    likesCount: sequelize.literal('likesCount + 1'),
  }, {
    where:{
      id: this.request.body.MemoryId,
    },
  });

  // 添加推送 赞 推送给记忆主人
  const memory = yield models.Memory.find({
    where: {
      id: this.request.body.MemoryId,
    },
    include: [{
      model: models.User,
    },
    ],
  });

  if (memory && memory.User.id !== this.session.id && memory.User.getuiCid) {
    const template = config.getui.template.memoryLike;
    yield utils.notification.sendNotificationToSingle(template.title, template.text, memory.User.getuiCid);
  }

  this.body = like.toJSON();

};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  const like = yield models.Like.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
  });

  if (!like) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
    return;
  }

  yield models.Album.update({
    likesCount: sequelize.literal('likesCount - 1'),
  }, {
    where: {
      id: like.AlbumId,
    },
  });
  yield models.Memory.update({
    likesCount: sequelize.literal('likesCount - 1'),
  }, {
    where: {
      id: like.MemoryId,
    },
  });

  const result = yield models.Like.destroy({
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (result === 0) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }
};
