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
      const adminModel = this.model('user');
      const data = await adminModel.where({username: username}).find();
      // 到数据库中去查找看是否有数据（用户名相符）
      if (think.isEmpty(data)) { // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
        const password = this.post('password');
        const utilsSerivce = this.service('utils', 'api');
        const password2 = utilsSerivce.md5(password);
        const sqlData = {
          id: utilsSerivce.uuid(),
          username: username,
          password: password2,
          register_time: utilsSerivce.getDateString(),
          login_time: utilsSerivce.getDateString(),
          nickname: '超级管理员',
          mobile: '13312345678',
          access: "['super_admin', 'admin']".toString(),
          avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
        };
        const insertId = await adminModel.add(sqlData);
        // 判断注册是否成功
        if (think.isEmpty(insertId)) {
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
};
