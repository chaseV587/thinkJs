const Base = require('./base.js');

module.exports = class extends Base {
  // 添加车位信息
  async addAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      /**
      `CREATE TABLE `easypark_carbarn` (
      `user_id` varchar(36) NOT NULL DEFAULT '' COMMENT '用户id,用于关联用户表',
      `park_id` varchar(36) NOT NULL DEFAULT '' COMMENT '车位ID',
      `park_no` varchar(36) NOT NULL DEFAULT '0' COMMENT '车位编号',
      `city` varchar(45) NOT NULL DEFAULT '' COMMENT '城市名',
      `address` varchar(145) NOT NULL DEFAULT '' COMMENT '地址',
      `park_status` int(11) NOT NULL DEFAULT '0' COMMENT '''车位状态编号：0-启用; 1-关闭; 2-维护'',',
      `use_status` int(11) NOT NULL DEFAULT '0' COMMENT '使用状态： 0-空闲; 1-使用中',
      `register_time` varchar(19) NOT NULL DEFAULT '' COMMENT '车位登记时间',
      `price` decimal(10,2) NOT NULL DEFAULT '0' COMMENT '停车单价/小时',
      PRIMARY KEY (`park_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
       */
      const utilsSerivce = this.service('utils', 'api');
      const userId = this.post('user_id'); // 用户id,用于关联用户表
      const parkNo = this.post('park_no'); // 车位编号
      const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const data = await carbarnModel.where({user_id: userId, park_no: parkNo}).find();
      if (think.isEmpty(data)) { // 如果数据库中不存在，就是新增
        // const parkId = this.post('park_id'); // 车位ID
        const userId = this.post('user_id'); // 用户id,用于关联用户表
        const city = this.post('city'); // 城市名
        const address = this.post('address'); // 地址
        const parkStatus = this.post('park_status'); // 车位状态编号：0-启用; 1-关闭; 2-维护
        const useStatus = this.post('use_status'); // 使用状态： 0-空闲; 1-使用中
        const price = this.post('price'); // 停车单价/小时
        const sqlData = {
          user_id: userId,
          park_id: utilsSerivce.uuid(),
          park_no: parkNo,
          city: city,
          address: address,
          park_status: parkStatus,
          use_status: useStatus,
          register_time: utilsSerivce.getDateString(),
          price: price
        };
        const insertId = await carbarnModel.add(sqlData);
        console.log(insertId);
        if (insertId !== 0) {
          return this.fail(403, '车位信息登记失败, 请重新登记'); // 注册不成功，返回错误信息。
        } else {
          return this.success({
            status: 'ok', // 注册状态成功
            info: '车位信息登记成功'
          });
        }
      } else {
        return this.fail(403, '车位信息已存在，请确认'); // 注册不成功，返回错误信息。
      }
    }
  };
  // 修改车位信息
  async updateAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      /**
      `CREATE TABLE `easypark_carbarn` (
        `user_id` varchar(36) NOT NULL DEFAULT '' COMMENT '用户id,用于关联用户表',
        `park_id` varchar(36) NOT NULL DEFAULT '' COMMENT '车位ID',
        `park_no` varchar(36) NOT NULL DEFAULT '0' COMMENT '车位编号',
        `city` varchar(45) NOT NULL DEFAULT '' COMMENT '城市名',
        `address` varchar(145) NOT NULL DEFAULT '' COMMENT '地址',
        `park_status` int(11) NOT NULL DEFAULT '0' COMMENT '''车位状态编号：0-启用; 1-关闭; 2-维护'',',
        `use_status` int(11) NOT NULL DEFAULT '0' COMMENT '使用状态： 0-空闲; 1-使用中',
        `register_time` varchar(19) NOT NULL DEFAULT '' COMMENT '车位登记时间',
        `price` decimal(10,2) NOT NULL DEFAULT '0' COMMENT '停车单价/小时',
        PRIMARY KEY (`park_id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
       */
      const utilsSerivce = this.service('utils', 'api');
      const userId = this.post('user_id'); // 用户id,用于关联用户表
      const parkNo = this.post('park_no'); // 车位编号
      const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const data = await carbarnModel.where({user_id: userId, park_no: parkNo}).find();
      if (!think.isEmpty(data)) { // 如果数据库中存在，就是可以去修改
        // const parkId = this.post('park_id'); // 车位ID
        const userId = this.post('user_id'); // 用户id,用于关联用户表
        const city = this.post('city'); // 城市名
        const address = this.post('address'); // 地址
        const parkStatus = this.post('park_status'); // 车位状态编号：0-启用; 1-关闭; 2-维护
        const useStatus = this.post('use_status'); // 使用状态： 0-空闲; 1-使用中
        const price = this.post('price'); // 停车单价/小时
        const sqlData = {
          user_id: userId,
          // park_id: utilsSerivce.uuid(),
          park_no: parkNo,
          city: city,
          address: address,
          park_status: parkStatus,
          use_status: useStatus,
          // register_time: utilsSerivce.getDateString(),
          price: price
        };
        // const insertId = await carbarnModel.add(sqlData);
        const isUpdate = await carbarnModel.where({user_id: userId, park_no: parkNo}).update(sqlData);
        console.log(isUpdate);
        if (isUpdate !== 1) {
          return this.fail(403, '车位信息修改失败, 请重新修改'); // 注册不成功，返回错误信息。
        } else {
          return this.success({
            status: 'ok', // 注册状态成功
            info: '车位信息修改成功'
          });
        }
      } else {
        return this.fail(403, '车位信息不存在，请确认'); // 注册不成功，返回错误信息。
      }
    }
  };
};
