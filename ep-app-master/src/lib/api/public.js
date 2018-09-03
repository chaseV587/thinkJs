import store from '../store/index.js'
const stream = weex.requireModule('stream')
const baseUrl = store.state.QRcodeUrl // 服务器地址
export default {
    fetchPost(url1, params = {}) {
        return new Promise((resolve, reject) => {
            return stream.fetch({
                method: 'POST',
                url: baseUrl+url1,
                type: 'json',
                body: params,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 2000,
            },function(ret) {
                console.log('请求json:', JSON.stringify(params))
                console.log('响应json:', JSON.stringify(ret))
                if(!ret.ok){
                    reject("连接失败，请检查网络")
                }else{
                    if(ret.data.state === '001'){
                        resolve(ret.data.data || '')
                    }else{
                        reject(ret.data.msg)
                    }
                }
            })
        })
    },
}