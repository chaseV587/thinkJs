const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    if (this.isPost){ // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const username = this.post('userName'); // 获取用户名给username变量
      const password = this.post('password');
      const data = await this.model('user').where({username: username, password: password}).find(); // 到数据库中去查找看是否有数据（用户名密码同时相符）
      if (think.isEmpty(data)){ // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
        return this.fail(403, '账号密码错误！请重新填写'); // 登录不成功，返回错误信息。
      } else {
        const TokenSerivce = this.service('token', 'api');
        const userInfo = {
          userid: data.id,
          username: data.username
        }
        const token = await TokenSerivce.create(userInfo);
        return this.success({
          token
        }); // 登录成功将用户信息写入session，返回到user首页。
      }
    }
  };
  async getUserInfoAction() {
    if (this.isPost){ // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const token = this.post('token'); // 获取用户名给username变量
      const TokenSerivce = this.service('token', 'api');
      const userInfo = await TokenSerivce.decode(token);
      console.log(userInfo);
      const username = userInfo.username;
      const userid = userInfo.userid
      // return this.success({
      //   userInfo
      // }); // 登录成功将用户信息写入session，返回到user首页。
      // const password = this.post('password');
      const data = await this.model('user').where({username: username, id: userid}).find(); // 到数据库中去查找看是否有数据（用户名密码同时相符）
      if (think.isEmpty(data)){ // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
        return this.fail(403, '账号密码错误！请重新填写'); // 登录不成功，返回错误信息。
      } else {
        // name: 'super_admin',
        // user_id: '1',
        // access: ['super_admin', 'admin'],
        // token: 'super_admin',
        // avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
        // const TokenSerivce = this.service('token', 'api');
        // const userInfo = {
        //   userid: data.id,
        //   username: data.username
        // }
        // const token = await TokenSerivce.create(userInfo);
        return this.success({
          user_name: data.nickname,
          user_id: data.id,
          access: ['super_admin', 'admin'],
          avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
          token,
        }); // 登录成功将用户信息写入session，返回到user首页。
      }
    }
  };
};
