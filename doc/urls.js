'use strict';

module.exports = [{
  url: '/getSeccode',
  method: 'post',
  input: {
    phone: '13660000000'
  }
}, {
  url: '/register',
  method: 'post',
  input: {
    phone: '13700000000',
    password: '123456789',
    gender: 'M',
    motto: "Let's go!"
  }
}, {
  url: '/login',
  method: 'post',
  input: {
    phone: '13000000000',
    password: '123456'
  }
}, {
  url: '/logout',
  method: 'get'
}, {
  url: '/update',
  method: 'put',
  input: {
    nickname: '我是666',
    password: '222222222',
    motto: '就是666.',
    gender: 'F',
    birthday: '1999-09-09',
    hometown: '黑龙江 哈尔滨'
  }
}, {
  url: '/getVersion?type=android',
  method: 'get'
}, {
  url: '/getVersion?type=ios',
  method: 'get'
}, {
  url: '/users/1',
  method: 'get'
}, {
  url: '/albums/1',
  method: 'get'
}, {
  url: '/albums',
  method: 'post',
  input: {
    title: '这是一个新建的相册',
    description: '今天天气不错',
    tags: '天气,哈工大,风景',
    isShare: true,
    isPublic: true,
    isShowRawInfo: true,
    allowLike: true,
    allowComment: true
  }
}, {
  url: '/albums/1',
  method: 'put',
  input: {
    title: '标题改改',
    description: '描述改改',
    tags: '改',
    isShare: false,
    isPublic: false
  }
}, {
  url: '/albums/1',
  method: 'delete'
}, {
  url: '/albumUsers',
  method: 'post',
  input: [{
    AlbumId: '1',
    UserId: '1'
  }, {
    AlbumId: '1',
    UserIds: '1,2,3'
  }]
}];