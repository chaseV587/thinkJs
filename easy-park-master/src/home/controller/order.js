const Base = require('./base.js');

module.exports = class extends Base {
  // 新增订单
  async addAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      /**
      CREATE TABLE `easypark_park_order` (
        `park_id` varchar(36) NOT NULL DEFAULT '' COMMENT '车位ID, 用于关联车位表',
        `order_id` varchar(36) NOT NULL DEFAULT '' COMMENT '订单id',
        `order_no` varchar(36) NOT NULL DEFAULT '' COMMENT '订单编号',
        `car_no` varchar(8) NOT NULL DEFAULT '' COMMENT '车牌编号',
        `mobile` varchar(20) NOT NULL COMMENT '手机号码',
        `strat_time` varchar(19) NOT NULL DEFAULT '' COMMENT '开始时间',
        `end_time` varchar(19) NOT NULL DEFAULT '' COMMENT '结束时间',
        `is_timeout` int(1) NOT NULL DEFAULT '0' COMMENT '是否超时: 0:否; 1:是',
        `over_time` varchar(19) NOT NULL DEFAULT '' COMMENT '超时时间',
        `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '停车单价/小时',
        `total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总计金额',
        `pay_type` varchar(10) NOT NULL DEFAULT '' COMMENT '支付方式',
        `non_payment` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '欠费金额',
        `is_inform` int(1) NOT NULL DEFAULT '0' COMMENT '是否通知: 0 未通知; 1 已经通知',
        PRIMARY KEY (`order_id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
       */
      const utilsSerivce = this.service('utils', 'api');
      const parkId = this.post('park_id'); // 车位id,用于关联车位表
      const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const data = await carbarnModel.where({park_id: parkId}).find();
      if (!think.isEmpty(data) && data.park_status === 0) { // 如果车位存在，且可以使用，就可以停车
        const orderModel = this.model('park_order');
        const orderNo = this.post('order_no'); // 订单号
        const orderStatus = this.post('order_status'); // 订单状态 // 0:未支付 1：已支付: 2: 欠款
        const carNo = this.post('car_no'); // 车牌号
        const mobile = this.post('mobile'); // 停车用户手机号码
        let startTime = this.post('start_time'); // 开始停车时间
        if (startTime === 'time') {
          startTime = utilsSerivce.getDateString();
        }
        const constTime = this.post('count_time'); // 停车总时间时间
        const isTimeout = this.post('is_timeout');
        const overTime = this.post('over_time');
        const price = this.post('price'); // 停车单价/小时
        const total = this.post('total'); // 总金额
        const payType = this.post('pay_type'); // 支付方式
        const nonPayment = this.post('non_payment'); // 欠费金额
        const isInform = this.post('is_inform'); // 是否短信通知 0 未通知; 1 已经通知
        const voucherNo = this.post('voucherNo'); // 支付凭证号
        const sqlData = {
          park_id: parkId,
          order_id: utilsSerivce.uuid(),
          order_no: orderNo,
          order_status: orderStatus,
          car_no: carNo,
          mobile: mobile,
          start_time: startTime,
          count_time: constTime,
          is_timeout: isTimeout || 0,
          over_time: overTime || 0,
          price: price,
          total: total,
          pay_type: payType,
          non_payment: nonPayment || 0.00,
          is_inform: isInform || 0,
          voucherNo: voucherNo
        };
        const insertId = await orderModel.add(sqlData);
        console.log(insertId);
        if (insertId !== 0) {
          return this.fail(403, '订单登记失败, 请重新登记'); // 订单登记不成功，返回错误信息。
        } else {
          const isUpdate = await carbarnModel.where({park_id: parkId}).update({use_status: 1});
          console.log(isUpdate);
          return this.success({
            status: 'ok', // 注册状态成功
            info: '订单信息登记成功',
            data: sqlData
          });
        }
      } else {
        return this.fail(403, '车位不可使用，请确认'); // 注册不成功，返回错误信息。
      }
    }
  };
  // 新增订单 后支付订单
  async payAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const orderNo = this.post('order_no'); // 订单号
      const orderModel = this.model('park_order');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const data = await orderModel.where({order_no: orderNo}).find();
      if (!think.isEmpty(data) && (data.order_status === 0 || data.order_status === 2)) { // 如果原订单存在  就可以去支付
        const orderStatus = this.post('order_status'); // 订单状态 // 0:未支付 1：已支付: 2: 欠款
        const payType = this.post('pay_type'); // 支付方式
        const sqlData = {
          order_status: orderStatus,
          pay_type: payType
        };
        const isUpdate = await orderModel.where({order_no: orderNo}).update(sqlData);
        console.log(isUpdate);
        if (think.isEmpty(isUpdate)) {
          return this.fail(403, '支付登记失败');
        } else {
          return this.success({
            status: 'ok', // 修改成功
            info: '订单支付登记成功'
          });
        }
      } else {
        return this.fail(403, '原订单不存在，请确认');
      }
    }
  };
  // 查询订单
  async queryAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      console.log('查询订单');
      const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const userId = this.post('user_id'); // 用户id,用于关联用户表
      // const data = await carbarnModel.where({user_id: userId}).select();
      const parkIdArr = await carbarnModel.field('park_id').where({user_id: userId}).select();
      console.log(parkIdArr);
      console.log(parkIdArr);
      if (think.isEmpty(parkIdArr)) {
        return this.fail(403, '此用户下没有车位数据, 请确认');
      } else {
        const orderModel = this.model('park_order');
        console.log(parkIdArr);
        const newParkId = [];
        console.log(newParkId);
        parkIdArr.forEach(element => {
          console.log(element);
          newParkId.push(element.park_id);
        });
        const data = await orderModel.where({park_id: ['IN', newParkId]}).select();
        console.log(data);
        if (think.isEmpty(parkIdArr)) {
          return this.fail(403, '此用户下没有订单数据, 请确认');
        } else {
          return this.success({
            status: 'ok',
            info: '查询订单信息成功',
            data: data
          });
        }
      }
    }
  };
  // 修改车位信息
  async updateAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      console.log('修改车位信息');
    }
  };
  // 删除车位信息
  async delAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const userId = this.post('user_id'); // 用户id,用于关联用户表
      const parkNo = this.post('park_no'); // 车位编号
      const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const affectedRows = await carbarnModel.where({user_id: userId, park_no: parkNo}).delete();
      console.log('affectedRows：' + affectedRows);
      if (affectedRows !== 0) {
        return this.fail(403, '车位信息删除失败, 请重新删除');
      } else {
        return this.success({
          status: 'ok', // 删除状态成功
          info: '车位信息删除成功'
        });
      }
    }
  };
  async queryAllAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。
      const userId = this.post('user_id'); // 用户id,用来查询车位信息
      const carbarnModel = this.model('carbarn');
      // 到数据库中去查找看是否有数据（车位id和车位编号）
      const data = await carbarnModel.where({user_id: userId}).select();
      if (think.isEmpty(data)) {
        return this.fail(403, '无车位信息');
      } else {
        return this.success({
          status: 'ok', // 删除状态成功
          data: data
        });
      }
    }
  }
};
