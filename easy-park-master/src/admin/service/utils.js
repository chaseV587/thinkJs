const utils = require('utility');
const uuidv1 = require('uuid/v1');
const secret = 'assdfsdfsdfdsf*123@#@@gf';

module.exports = class extends think.Service {
  // md5 加密
  md5(data) {
    const newData = data + secret;
    const md5Data = utils.md5(newData);
    return md5Data;
  }
  // 生成uuid
  uuid() {
    const uuidDate = uuidv1();
    return uuidDate;
  }
  // 生成时间 'YYYY-MM-DD HH:mm:ss' format date string
  getDateString() {
    const date = utils.YYYYMMDDHHmmss();
    return date;
  }
};
