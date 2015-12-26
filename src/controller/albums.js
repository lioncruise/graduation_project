'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const config = require('../config');

//获取相册二维码
router.get('/getQRCode', function*() {
  const AlbumId = parseInt(this.query.albumId);
  if (!AlbumId) {
    this.body = {
      statusCode: 404,
      message: '获取失败',
    };
    return;
  }

  const secCode = utils.getJoinAlbumSecCode(AlbumId);
  const url = config.url + `/joinAlbum?a=${AlbumId}&c=${secCode}`;

  this.body = url;
});

//获取自己创建的公开相册
router.get('/getPublicAlbums', function*() {
  this.verifyParams({
    userId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  }, Object.assign(this.request.body, this.query));

  const albums = yield models.Album.findAll({
    paranoid: true,
    where: {
      UserId: this.query.userId,
      isPublic: 'public',
    },
  });

  this.body = albums;
});

//获取自己创建的相册
router.get('/getOwnAlbums', function*() {
  const UserId = Number.parseInt(this.query.userId) ? Number.parseInt(this.query.userId) : this.session.user.id;

  const include = [];
  if (this.query.isWithRecentPicture === 'true') {
    include.push({
      model: models.Picture,
      as: 'RecentPicture',
      include: [{
        model: models.User,
      },
      ],
    });
  }

  const albums = yield models.Album.findAll({
    paranoid: true,
    where: {
      UserId,
    },
    include,
  });

  this.body = albums.map((album) => album.toJSON());
});

const getGetAlbumsControllerFunction =  function(modelName) {
  return function*() {
    const UserId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;
    const albumIds = (yield models[modelName].findAll({
      where: {
        UserId,
      },
    })).map((elm) => elm.AlbumId);

    const include = [];
    if (this.query.isWithRecentPicture === 'true') {
      include.push({
        model: models.Picture,
        as: 'RecentPicture',
        include: [{
          model: models.User,
        },
        ],
      });
    }

    const albums = yield models.Album.findAll({
      paranoid: true,
      where: {
        id: {
          $in: albumIds,
        },
      },
      include,
    });

    this.body = albums.map((album) => album.toJSON());
  };
};

//获取自己加入的相册
router.get('/getRelatedAlbums', getGetAlbumsControllerFunction('AlbumUserCollaborate'));

//获取自己关注的相册
router.get('/getFollowAlbums', getGetAlbumsControllerFunction('AlbumUserFollow'));
