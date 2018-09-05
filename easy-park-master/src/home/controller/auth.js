const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const username = this.post('username'); // 获取用户名给username变量
      const password = this.post('password');
      const utilsSerivce = this.service('utils', 'api');
      const password2 = utilsSerivce.md5(password);
      const data = await this.model('admin').where({username: username, password: password2}).find(); // 到数据库中去查找看是否有数据（用户名密码同时相符）
      if (think.isEmpty(data)) { // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
        return this.fail(403, '账号密码错误！请重新填写'); // 登录不成功，返回错误信息。
      } else {
        const TokenSerivce = this.service('token', 'api');
        const userInfo = {
          userid: data.id,
          username: data.username
        };
        const token = await TokenSerivce.create(userInfo);
        return this.success({
          token
        }); // 登录成功将用户信息写入session，返回到user首页。
      }
    }
  };
  async registerAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const username = this.post('username'); // 获取用户名给username变量
      const userModel = this.model('user');
      const data = await userModel.where({username: username}).find();
      // 到数据库中去查找看是否有数据（用户名相符）
      if (think.isEmpty(data)) { // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
        const nickname = this.post('nickname');
        const mobile = this.post('mobile');
        const pos_sn = this.post('pos_sn');
        const mer_no = this.post('mer_no') || '';
        const ter_no = this.post('ter_no') || '';
        const password = this.post('password');
        const utilsSerivce = this.service('utils', 'api');
        const password2 = utilsSerivce.md5(password);
        const sqlData = {
          id: utilsSerivce.uuid(),
          username: username,
          password: password2,
          register_time: utilsSerivce.getDateString(),
          nickname: nickname,
          mobile: mobile,
          pos_sn: pos_sn,
          mer_no: mer_no,
          ter_no: ter_no
        };
        console.log(sqlData);
        const insertId = await userModel.add(sqlData);
        console.log(think.isEmpty(insertId));
        // 判断注册是否成功
        if (insertId !== 0) {
          return this.fail(403, '注册失败！请重新注册'); // 注册不成功，返回错误信息。
        } else {
          return this.success({
            status: 'ok' // 注册状态成功
          });
        }
      } else {
        return this.fail(403, '用户名已存在，请确认'); // 注册不成功，返回错误信息。
      }
    }
  };
  async updateInfoAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const username = this.post('username'); // 获取用户名给username变量
      const password = this.post('password');
      const utilsSerivce = this.service('utils', 'api');
      const password2 = utilsSerivce.md5(password);
      const userModel = this.model('user');
      const data = await userModel.where({username: username, password: password2}).find();
      // 到数据库中去查找看是否有数据（用户名相符）
      if (!think.isEmpty(data)) { // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
        const newPassword = this.post('newPassword');
        const newPassword2 = utilsSerivce.md5(newPassword);
        const isUpdate = await userModel.where({username: username}).update({password: newPassword2});
        // 判断注册是否成功
        if (think.isEmpty(isUpdate)) {
          return this.fail(403, '修改密码失败！请重新修改'); // 修改密码不成功，返回错误信息。
        } else {
          return this.success({
            status: 'ok' // 修改成功
          });
        }
      } else {
        return this.fail(403, '用户不存在，请确认'); // 用户名不存在，修改密码失败，返回错误信息。
      }
    }
  };
};
