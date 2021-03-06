'use strict';

const utility = require('utility');

module.exports = [{
  fileName: 'POST verifyPhone',
  func: '验证用户手机号',
  note: [
          '1.前端向mob发起验证请求，然后用户输入验证码后，把手机号和验证码一起发给后端这个接口。',
          '2.后端会验证验证码是否正确，返回status为是否正确。',
          '3.也就是说，验证码是mob的SDK发送的，验证是否正确是我的服务器进行的。',
          '4.这样设计的原因，是防止别人抓包、反编译，来直接模拟发送register接口。后端记录一下验证内容，可以在注册的时候，知道哪些手机是被验证过的。',
          '5.需要加system为ios或android',
          ],
  requests: [
    {
      method: 'post',
      url: '/verifyPhone',
      data: {
        phone: '15945990589',
        secCode: '5678',
        system: 'ios',
      },
    },
    {
      method: 'post',
      url: '/verifyPhone',
      data: {
        phone: '13000000007',
        secCode: '5678',
        system: 'android',
      },
    },
  ],
}, {
  fileName: 'POST register',
  func: '用户注册',
  note: [
          '1.phone会进行正则检测  (^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$  。',
          '2.password进行md5加密。',
          '3.可以不包含avatarStoreKey项，默认为default。',
          '4.会自动给用户建立一个默认相册。',
          '5.会建立cookie。',
          '6.手机号需要提前调用/verifyPhone接口验证，否则无法正常注册。',
          ],
  requests: [
    {
      method: 'post',
      url: '/register',
      data: {
        phone: '15945990589',
        nickname: '小王',
        password: utility.md5('123456'),
        gender: 'M',
        motto: 'Do cool things that matter.',
        avatarStoreKey: '123',
      },
    },
  ],
}, {
  fileName: 'GET isExistingUser',
  func: '按手机号查找用户是否存在',
  note: [
          ],
  requests: [
    {
      method: 'get',
      url: '/isExistingUser?phone=13000000002',
    },
    {
      method: 'get',
      url: '/isExistingUser?phone=15945990000',
    },
  ],
}, {
  fileName: 'POST recoverPassword',
  func: '用户登录忘记密码时修改',
  note: [
          '1.phone会进行正则检测  (^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$  。',
          '2.前端对password进行md5加密。',
          '3.会建立cookie。',
          '4.手机号需要提前调用/verifyPhone接口验证，否则无法正常注册。',
          ],
  requests: [
    {
      method: 'post',
      url: '/recoverPassword',
      data: {
        phone: '13000000007',
        newPassword: utility.md5('123456'),
      },
    },
  ],
}, {
  fileName: 'POST login',
  func: '登陆',
  note: [
          '1.会建立cookie',
          ],
  requests: [
  {
    method: 'post',
    url: '/login',
    data: {
      phone: '13000000001',
      password: utility.md5('13000000001'),
    },
  },
  ],
}, {
  fileName: 'GET getUserIdByKey',
  func: 'PC端服务器通过用户特征值获得用户id',
  note: [
          '1.PC端服务器调用的接口，app不调用这个接口',
          ],
  requests: [
  {
    method: 'get',
    url: '/getUserIdByKey?key=123456',
  },
  ],
}, {
  fileName: 'GET logout',
  func: '登出',
  note: [
          '1.会删除所有cookie',
          ],
  requests: [
  {
    method: 'get',
    url: '/logout',
  },
  ],
},  {
  fileName: 'PUT update',
  func: '更新用户信息',
  note: [
          '1.增量更新，可以只添加需要更改的项。',
          '2.可以更改手机号。',
          '3.可以更新个推的推送CID。CID的更新请在登陆和检测到个推CID改变时更新。',
          '4.update用于更新个人信息和密码，当更新项包括password时，必须添加一个字段oldPassword，如果没有旧密码或者旧密码错误，都无法正常更新；如果不更新密码，则可以不带oldPassword字段。',
          '5.增加backgroundStoreKey字段存储我页面背景图片的七牛key',
          ],
  requests: [
    {
      method: 'put',
      url: '/update',
      data: {
        nickname: '小王',
        oldPassword: utility.md5('13000000001'),
        password: utility.md5('1234567'),
        gender: 'F',
        birthday: '1990-10-11',
        hometown: '黑龙江 哈尔滨',
        motto: 'Do cool things that matter.',
        avatarStoreKey: '123',
        getuiCid: '06fe917679a82622368d08af6f8f21d5',
        backgroundStoreKey: '',
      },
    },
  ],
},
];
