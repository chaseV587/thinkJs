const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    const user = this.model('user'); // controller 里实例化模型
    const data = await user.select();
    console.log(data)
    // let userinfo =await this.session('userinfo')
    // if (!think.isEmpty(userinfo)){
    //   this.assign('userinfo',userinfo);
    // }else{
    //   return this.redirect('/admin/index');
    // }
    this.assign('title', '测试网页之hello world!');
    // return this.display();
    return this.success({
      data: data
    });
  };
};
