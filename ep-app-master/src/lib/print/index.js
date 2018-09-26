
import umsApi from 'ums-api'
import Script from './template/script/slip'

let printConfig = {
    data: null,
    templateName: 'slip',
    totalPage: null,
    isSupportScriptPrint: false
}

function startPrint(printData, callback) {
    let data = Script.getPrintData(printData)
    data = data.replace(/\n\s+/ig, '\n')
    data = JSON.stringify(data)
    console.log(data)
    print(data, res => {
        callback(res)
    })
}

function print(printData1, callback) {
    var text = JSON.parse(printData1)
    umsApi.callPrinter({
        'type': 'script', //png或script
        'data': text //图片路径或脚本
    }, ret=>{
        console.log('这是返回结果:' + JSON.stringify(ret))
        callback(ret)
    })
}
export default {
    startPrint
}
