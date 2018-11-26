/* body... */

var domainArr = {
    "Everbuying.net": 10001,
    "Gearbest.com": 10002,
    "Dealsmachine.com": 10003,
    "Igogo.es": 10004,
    "Volumebest.com": 10005,
    "Sammydress.com": 10006,
    "Rosegal.com": 10007,
    "Rosewholesale.com": 10008,
    "Dresslily.com": 10009,
    "Twinkledeals.com": 10010,
    "Trendsgal.com": 10011,
    "Nastydress.com": 10012,
    "Zaful.com": 10013,
    "Dezzal.com": 10014,
    "evervia.com": 10015,
    "nextmia.com": 10016,
    "dressfo.com": 10017,
    "dizener.com": 10018,
    "gamiss.com": 10019,
    "BoyNewYork.com": 10020,
    "Digbest.com": 10021,
    "YoShop.com": 10022,
    "Stylebest.com": 10023,
    "Girlbest.com": 10023,
}
/**
 * 获取域名编号
 */
function HandleDomain() {
    var href = window.location.href
    var str = '';
    Object.keys(domainArr).forEach(function (item) {
        var pattern = eval(`/${item}/i`)

        if (pattern.test(href)) {
            console.log('domainArr', domainArr[item])
            str = domainArr[item]
        }
    })
    return str
}

function TrackTime(argument) {
    // body...

}


// 曝光传参
var ie_State = {
    glb_t: 'ie', // 行为类型：ie 为曝光，ic为点击 默认为曝光
    glb_w: TrackTime(), //页面停留时间
    glb_tm: Number, //发生曝光的当前时间搓
    glb_oi: String, //seesion_id
    glb_d: HandleDomain(), //域名编号,使用函数编写，根据域名获取编号
    glb_b: 'c', //页面大类
    glb_s: String, //页面小类
    glb_dc: Number, //国家编码
    glb_od: String, // cookie_id
    glb_osr_referrer: String, //外部来源连接
    glb_osr_landing: window.location.origin, // 着陆页
    glb_cl: window.location.href, // 当前页面
    glb_pl: document.referrer || '/', // 上一个 页面 url
    glb_filter: String, //s商品排序与页面商品数量
    glb_u: String, // userid ,未登录不填写
    glb_plf: String, // 终端
    glb_ubcta: [{}], // 子事件属性 [{mlrc:String,sku:''}]
    glb_pm: 'mr', // 页面模块
}



// 点击传参
var ic_State = {
    glb_t: 'ic', // 行为类型：ie 为曝光，ic为点击 默认为曝光
    glb_w: TrackTime(), //页面停留时间
    glb_tm: Number, //发生点击的当前时间搓
    glb_oi: String, //seesion_id
    glb_x: Function, // 点击事件
    glb_ubcta: String, // 子事件属性
    glb_d: HandleDomain(), //域名编号,使用函数编写，根据域名获取编号
    glb_b: 'c', //页面大类
    glb_s: String, //页面小类
    glb_dc: Number, //国家编码
    glb_od: String, // cookie_id
    glb_osr_referrer: String, //外部来源连接
    glb_osr_landing: String, // 着陆页
    glb_cl: window.location.href, // 当前页面
    glb_pl: document.referrer || '/', // 上一个 页面 url
    glb_filter: String, //s商品排序与页面商品数量
    glb_u: String, // userid ,未登录不填写
    glb_plf: String, // 终端
    glb_bts: String, // AB_test 实验字段
    glb_ubcta: [{}], // 子事件属性 [{mlrc:String,sku:''}]
    glb_pm: 'mr', // 页面模块
}

/**
 * 设备是 M 端，还是 PC端
 * @return {[type]} [description]
 */
function devices() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return 'm'
        // 移动端操作
    } else {
        return 'PC'
        // PC端操作
    }
}
//  创建图片
function createImg(src) {
    var img = document.createElement('img');
    img.width = 1;
    img.height = 1;
    img.src = src;
    return img;
}

// 使用图片上报
function imgPing(api, params, cb) {
    var img = createImg(api + '?' + params);
    img.onload = img.onerror = function () {
        img.onload = null;
        img.onerror = null;
        cb();
    }
    return true;
}
// xhr 上报
function xhrPing(api, params, cb) {
    if (!window.XMLHttpRequest) {
        return true;
    }
    let xhr = new window.XMLHttpRequest();
    if (!('withCredentials' in xhr)) {
        return true;
    }
    xhr.open('POST', api, true);
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = function () {
        4 == xhr.readyState && (cb(), xhr = null)
    };
    xhr.send(params);
    return true;
}

/**
 * 曝光分两种
 * 一，在可视区域内的曝光
 * 二，推荐位翻页的时候
 * @param {[type]} didElement [description]
 */
function TrackExpose(didElement) {
    // 在可视区域内曝光
    var frist = true
    var config = { attributes: true, childList: true, subtree: true };
    /**
     * 视觉监听
     * @param  {[type]} entries  [description]
     * @param  {[type]} observer [description]
     * @return {[type]}          [description]
     */
    var intersectionCallback = function (entries, observer) {
        // body...
        if (entries[0].isIntersecting && frist) {
            ie_State.glb_tm = (new Date()).getTime()
            ie_State.glb_plf = devices()
            frist = false
            xhrPing('http://10.32.4.191:3000/tracking', JSON.stringify(ie_State), function () {})
        }
    }
    var obsIntersection = new IntersectionObserver(intersectionCallback);
    obsIntersection.observe(didElement);

    /**
     * 重绘监听
     * mutation.type
     *   childList：子节点的变动
     *   attributes：属性的变动
     *   characterData：节点内容或节点文本的变动
     *   subtree：所有后代节点的变动。
     * @param  {[type]} mutationsList [description]
     * @return {[type]}               [description]
     */
    var mutationCallback = function (mutationsList) {
        // body...
        for (var mutation of mutationsList) {
            // statement
            if (mutation.type === 'subtree') {
                ie_State.glb_tm = (new Date()).getTime()
                ie_State.glb_plf = devices()
                xhrPing('http://10.32.4.191:3000/tracking', JSON.stringify(ie_State), function () {})
            }
        }
    }
    var mutationObServer = new MutationObserver(mutationCallback);
    obsIntersection.observe(didElement);

}

/**
 * 点击事件
 * @param {[type]} didElement        [description]
 * @param {[type]} didClickClassName [description]
 */
function TrackClick(didElement, didClickClassName) {
    var clsArr = didElement.querySelectorAll(didClickClassName);
    clsArr.forEach(function (e) {
        /* body... */
        e.addEventListener('click', function (argument) {
            /* body... */

            // console.log('click', argument)
            ic_State.glb_tm = (new Date()).getTime()
            ic_State.glb_plf = devices()
            xhrPing('http://10.32.4.191:3000/tracking', JSON.stringify(ic_State), function () {})
        })
    })
}
