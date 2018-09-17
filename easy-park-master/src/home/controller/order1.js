module.exports = class extends think.Model {
  // 查询订单
  async queryAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      console.log('查询订单');
      // const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const userId = this.post('user_id'); // 用户id,用于关联用户表
      // const data = await carbarnModel.where({user_id: userId}).find();
      // __GROUP__
      const sql = `SELECT park_id FROM easypark_carbarn where user_id = ${userId}`;
      // const sql = `SELECT park_id FROM __CARBARN__ where user_id = ${userId}`;
      console.log('sql: ' + sql);
      const data = this.parseSql(sql);
      console.log(data);
      if (think.isEmpty(data)) {
        return this.fail(403, '此用户下没有车位数据, 请确认');
      } else {
        return this.success({
          status: 'ok', // 删除状态成功
          info: '车位信息删除成功',
          data: data
        });
      }
    }
  };
};
