import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        appVersion: '进销存管家V1.0',
        isTimeLog: true,
        deviceWidth: weex.config.env.deviceWidth,
        deviceHeight: weex.config.env.deviceHeight,
        screenHeight: '',
        goodsInfo: {
            id: '', // storeNo + barcode
            storeNo: '', // 门店号 先写死
            barcode: '',  // 条码
            name: '',  // 商品名称
            brand: '',  // 品牌
            rule: '', // 规格
            unit: '',  // 单位
            unspsc: '', // 分类代码
            yieldly: '',  // 产地
            price: '', // 价格
            costPrice: '', // 进价
            category: '默认分类', // 商品分类
            updateTimes: 201801261609,  // yyyyMMddHHmmss
            stock: 0,  // 库存
            safetyStock: 0,  // 预警库存
            isCustom: false, // 是否存在于条码库
            isComplete: false,  // 是否本地编辑完成
            hasUpload: false,   //新增或修改商品是否上送
            needQuery: true,   //是否需要自动查询
            state: false,
            isDBdata: true, // 是否数据库数据
            discount: 10,
        },
        categoryInfo: {
            id: '', // storeNo + catId
            catId: '', // 分类id
            catName: '',  // 分类名称
            storeNo: '',  // 门店号 先写死
            isModify: 0,  // 是否允许修改
            hasUpload: 0 // 规格
        },
        storeNo: '0001',    // 门店号 先写死
        categoryList: [],
        orderGoodsList: [], // 订单商品列表
        orderGoodsTotal:{ // 订单相关统计数据
            totalCount: 0,
            totalPrice: 0
        },
        orderGoodsDetail:{},
        paths: [],
        orderData: {},
        orderGoodsNumber: 0,
        isShowTabbar: false,
        isWarnQuery: false,
        isReset: true,    // 是否清空数据
        isFromHome: false,
        url: 'http://59.60.4.3:8888/easy-order-rest',
        QRcodeUrl: 'http://58.247.0.18:39010', // 后台地址
        storeUrl: 'http://58.247.0.18:39006/bmp', // 计费平台地址
        userName: 'admin',
        password: '123456',
        platformData: {
            token: '',
            randomKey: '',
            storeId: '',
        },
        indicatorIsShow: false,
        loadingIsShow: false,
        storeInfo: {
           storeNo: '' ,
           storeName: ''
        },
        scanData: '',
        merchant_Id:'',
        userParam:'',
        times:{}, // 到期时间、备份时间的显示
        vipInfo:{},
		checkStyle: '1',
        maskHeight: '300px',
    },
    mutations: {
        setGoodsInfo(state, object) {
            state.goodsInfo = object
            state.goodsInfo.id = object.id || object.storeNo + object.barcode
        },
        restoreGoodsInfo(state) {
            state.goodsInfo = {
                id: '', storeNo: '0001', barcode: '', name: '', brand: '', rule: '', unit: '', unspsc: '', yieldly: '', 
                price: '',costPrice: '', category: '默认分类', updateTimes: 2018010100000000, stock: 0, safetyStock: 0, isCustom: false, isComplete: false, 
                hasUpload: false, needQuery: true, state: false
            }
        },
        restoreCategoryList(state) {
            state.categoryList = []
        },
        setCategoryList(state, object) {
            state.categoryList.push(object)
        },
        // flag- 0：删除，1:增加，2：更新；
        setOrderGoodsList(state, object) {
            console.log('setOrderGoodsList-object: ', object)
            if (object.flag === 2) {
                state.orderGoodsList = object.item
            } else if (object.flag === 1) {
                state.orderGoodsList.push(object.item)
            } else {
                state.orderGoodsList.splice(object.item, 1) // 默认删除一个记录
            }
            // 统计商品的总数量和金额
            const orderGoodsList = state.orderGoodsList
            let totalCount = 0
            let totalPrice = 0
            orderGoodsList.forEach((item) => {
                totalCount = totalCount + Number(item.count)
                totalPrice = totalPrice + (Number(item.amount) *1000)
            })
            state.orderGoodsTotal.totalCount = totalCount
            state.orderGoodsTotal.totalPrice = totalPrice / 1000
        },
        setOrderData(state, object) {
            state.orderData = object
        },
        setOrderGoodsDetail(state, object) {
            state.orderGoodsDetail = object
        },
        setIsShow(state) {
            state.isShowTabbar = !state.isShowTabbar
        },
        setIsWarnQuery(state) {
            state.isWarnQuery = !state.isWarnQuery
        },
        setpath(state, view) {
            state.backPath = view
        },
        setIsReset(state, flag) {
            state.isReset = flag
        },
        setIsFromHome(state, flag) {
            state.isFromHome = flag
        },
        addPaths(state, item) {
            state.paths.unshift(item)   //从数组开头添加元素
        },
        deletePaths(state) {
            state.paths.shift()     //从数组开头删除元素
        },
        clearPaths(state) {
            state.paths = ['/']     //只保留一个'/'
        },
        setToken(state, str) {
            state.platformData.token = str
        },
        setStoreId(state, str) {
            state.platformData.storeId = str
        },
        setRandomKey(state, str) {
            state.platformData.randomKey = str
        },
        setOrderGoodsNumber(state, param) {
            state.orderGoodsNumber = param
        },
        reset(state) {
            state.transEntity = {}
            state.transResp = {}
            state.paths = []
            state.isShowTabbar = false
            state.platformData = {
                token: '',
                randomKey: '',
                storeId: '',
            }
            state.title = ''
        },
        setIndicator(state, param) {
            state.indicatorIsShow = param
        },
        setLoading(state, param) {
            state.loadingIsShow = param
        },
        setStoreInfo(state, param) {
            state.storeInfo.storeNo=param.storeNo,
            state.storeInfo.storeName=param.storeName
        },
        setScreenHeight(state, param) {
            state.screenHeight=param
        },
        setDeviceHeight(state, param) {
            state.deviceHeight=param
        },
        setScanData(state, param) {
            state.scanData = ''
            state.scanData = param
        },
        setMerchant_Id(state, param){
            state.merchant_Id = param
        },
        setUserParam(state, param){
            state.userParam = param
        },
        setTimes(state, obj){
            if(obj.backupTime){
                state.times.backupTime = obj.backupTime // 上次备份时间 显示在云端备份页面
            }
            if(obj.openStatu){
                state.times.openStatu = obj.openStatu // 开通试用状态、控制云端备份页面的btn显示
            }
            if(obj.expireTime){
                state.times.expireTime = obj.expireTime // 到期时间  升级到高阶版本显示 
            }
            if(obj.hasInitPw){
                state.times.hasInitPw = obj.hasInitPw // 是否初始化密码标志位
            }

        },
        setVipInfo(state, param){
            state.vipInfo = {}
            state.vipInfo = param
        }
    }
})


function merge(dist, source) {
    if (typeof dist !== 'object' || typeof source !== 'object') {
        return
    }
    Object.keys(source).forEach((key) => {
        if (source[key] && !(source[key] instanceof Array) && typeof source[key] === 'object') {
            dist[key] = dist[key] || {}
            merge(dist[key], source[key])
        } else {
            Vue.set(dist, key, source[key])
        }
    })
}

export default store