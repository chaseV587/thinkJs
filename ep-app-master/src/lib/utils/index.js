export default {
  methods: {
    /**
     * 转成以分为单位
     * @param {*} amount xx.xx
     * @param {*} power 小数点位数
     */
    accMul (amount, power) {
      let num = Number(amount).toFixed(2)
      console.log('num 111 =', num)
      num = num.split('.')
      console.log('num 222 =', num)
      if (Number(num[0]<0)) {
        const num2 = Math.abs(num[0])
        let data = (Number(num2) * (10 ** power)) + (Number(num[1]) || 0)
        data = '-'+data
        return data
      } else {
        console.log((Number(num[0]) * (10 ** power)) + (Number(num[1]) || 0))
        return (Number(num[0]) * (10 ** power)) + (Number(num[1]) || 0)
      }
    },
  }
}