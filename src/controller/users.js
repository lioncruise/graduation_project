'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

const getGetUsersControllerFunction = function(modelName, type) {
  return function*() {
    const UserId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;

    const fansResult = yield models[modelName].findAll({
      where: {
        TargetUserId: UserId,
      },
    });
    const followersResult = yield models[modelName].findAll({
      where: {
        UserId,
      },
    });

    const fansUserIds = fansResult.map((elm) => elm.UserId);
    const followersUserIds = followersResult.map((elm) => elm.TargetUserId);

    const targetUserIds = (type === 'followers' ? followersUserIds : fansUserIds);
    const sourceUserIds = (type === 'followers' ?  fansUserIds : followersUserIds);

    const users = yield models.User.findAll({
      paranoid: true,
      where: {
        id: {
          $in: targetUserIds,
        },
      },
    });

    this.body = users.map(function(elm) {
      const user = elm.toJSON();
      user.isFollowEachOther = sourceUserIds.indexOf(user.id) > -1;
      return user;
    });
  };
};

//获取一个用户的关注者
router.get('/getFollowers', getGetUsersControllerFunction('UserUserFollow', 'followers'));

//获取一个用户的粉丝
router.get('/getFans', getGetUsersControllerFunction('UserUserFollow', 'fans'));
