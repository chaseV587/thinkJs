/* eslint max-len: 0 */
// 脚本打印居中
import _ from 'lodash'
console.log(_)
/**
 * 右填充，填充到指定长度
 *
 * @param srcStr:String 原始字符串
 * @param len:Number 长度
 * @param padding:String 填充的字符串
 * @returns {string}
 */
// function paddingRight(srcStr, len, padding) {
//     while (srcStr.length < len) {
//         srcStr = srcStr + padding
//     }
//     return srcStr
// }

/**
 * 左填充，填充到指定长度
 *
 * @param srcStr:String 原始字符串
 * @param len:Number 长度
 * @param padding:String 填充的字符串
 * @returns {string}
 */
function paddingLeft(srcStr, len, padding) {
    console.log(srcStr, len, padding)
    while (srcStr.length < len) {
        srcStr = padding + srcStr
    }
    return srcStr
}
function setPrintTemplate(data) {
        let isDiscount = false
        let printTemplate = `!hz l
            !asc n
            !gray 8
            !yspace 6
            *image c 284*81 data:base64;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
            *text c 
            !hz n
            !asc n
            !gray 8
            !yspace 6
            `
        printTemplate += ` 
            !hz n
            !asc n
            !gray 8
            !yspace 6
            *text l 订 单 号：${data.order_no}
            *text l 操 作 员：${data.user_id}
            *text l 车位编号：${data.park_no}
            *text l 车位地址：${data.address}
            *text l 车 牌 号：${data.car_no}
            *text l 开始时间：${data.start_time || ''}
            *text l 停车时长：${data.count_time} (小时)
            *text l 停车单价：${data.price} (元/小时)
            *text l 应 收 款：${data.total}
            *text l 支付方式：${data.pay_type}
            *text l 实际收款：${data.total}
            !hz sn
            !asc sn
            !gray 8
            *text c ...............................................
            !hz n
            !asc n
            !gray 8
            !yspace 6
            `
        printTemplate += `
            !hz sn
            !asc sn
            !gray 8
            !yspace 6
            *text c 欢迎您的下次光临
            !hz l
            !asc l
            !gray 0
            !yspace 6
            !hz sn
            !asc sn
            !gray 8
            `
        console.log(printTemplate, 111111)
        return printTemplate
}

function getPrintData(printData) {
    return setPrintTemplate(printData)
}

export default {
    getPrintData
}
