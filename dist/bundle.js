!function(e){var r={};function t(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(a,n,function(r){return e[r]}.bind(null,n));return a},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(module,exports,__webpack_require__){const TarckUtils=__webpack_require__(1),xhr=__webpack_require__(2);window.onload=function(){function getParamData(){return result={ob:TarckUtils.getTarckCookie("od"),ubcu:TarckUtils.getTarckUbcu()||"",ubci:TarckUtils.getTarckUbci(),spcb:TarckUtils.getTarckSpcb(),ubcd:TarckUtils.getTarckUbcd(),p:TarckUtils.getTarckPageId(),dc:TarckUtils.getTarckDc(),osr:{referrer:TarckUtils.getTarckCookie("osr_referrer"),landing:TarckUtils.getTarckCookie("osr_landing")}}}const queueChangedListener=function(){},TrackClick=function(paramObj,prevParamsType){var constparams=paramObj,url;url=`https://yigeego.github.io/Track?${TarckUtils.FIELD_PREFIX}t=ic&${TarckUtils.FIELD_PREFIX}pm=mr`,paramObj.hasOwnProperty("w")||(url+=TarckUtils.getTarckTimeStamp()),paramObj.hasOwnProperty("tm")||(url+=TarckUtils.getTarckWaitTime()),paramObj.hasOwnProperty("u")||(paramObj.u=constparams.ubcu),paramObj.hasOwnProperty("oi")||(paramObj.oi=constparams.ubci),paramObj.hasOwnProperty("d")||(paramObj.d=constparams.ubcd),paramObj.hasOwnProperty("b")||(paramObj.b=constparams.spcb),paramObj.hasOwnProperty("p")||(paramObj.p=constparams.pageid),paramObj.hasOwnProperty("dc")||(paramObj.dc=constparams.dc),paramObj.hasOwnProperty("od")||(paramObj.od=constparams.od),paramObj.hasOwnProperty("osr_referrer")||(paramObj.osr_referrer=constparams.osr.referrer),paramObj.hasOwnProperty("osr_landing")||(paramObj.osr_landing=constparams.osr.landing),paramObj.hasOwnProperty("ubcta")||(paramObj.ubcta=TarckUtils.getViewedAllBrowerValue("#recommend_wrapper1"));var did=document.querySelector("#recommend_wrapper1");console.log("did",did);var didClick=did.querySelectorAll(".ui-recommend-product.logsss_event_ps");didClick.forEach(function(e){e.addEventListener("click",function(item){var logsssValue=eval(`(${e.attributes["data-logsss-event-value"].value})`);paramObj.x=logsssValue.skuinfo.sku,paramObj.skuinfo=logsssValue.skuinfo,pushData(url,paramObj)})})};function TrackExpose(e,r){var t,a=e;t=`https://yigeego.github.io/Track?${TarckUtils.FIELD_PREFIX}t=ie&${TarckUtils.FIELD_PREFIX}pm=mr`,e.hasOwnProperty("w")||(t+=TarckUtils.getTarckTimeStamp()),e.hasOwnProperty("tm")||(t+=TarckUtils.getTarckWaitTime()),e.hasOwnProperty("u")||(e.u=a.ubcu),e.hasOwnProperty("oi")||(e.oi=a.ubci),e.hasOwnProperty("d")||(e.d=a.ubcd),e.hasOwnProperty("b")||(e.b=a.spcb),e.hasOwnProperty("p")||(e.p=a.pageid),e.hasOwnProperty("dc")||(e.dc=a.dc),e.hasOwnProperty("od")||(e.od=a.od),e.hasOwnProperty("osr_referrer")||(e.osr_referrer=a.osr.referrer),e.hasOwnProperty("osr_landing")||(e.osr_landing=a.osr.landing),e.hasOwnProperty("ubcta")||(e.ubcta=TarckUtils.getViewedAllBrowerValue("#recommend_wrapper1")),pushData(t,e)}function pushData(e,r){for(var t in r.cl||(r.cl=location.href),r.pl||(r.pl=document.referrer),r){var a=r[t];a&&("string"==typeof a?(a=encodeURIComponent(a),e+=TarckUtils.renderData(t,a)):e+=TarckUtils.renderData(t,a))}xhr.xhrGetPing(e)}TrackExpose(getParamData()),TrackClick(getParamData())}},function(module,exports){const TarckUtils={FIELD_PREFIX:"glb_",getTarckCookie:e=>{if(document.cookie.length>0){var r=document.cookie.indexOf(e+"=");if(-1!=r){r=r+e.length+1;var t=document.cookie.indexOf(";",r);return-1==t&&(t=document.cookie.length),unescape(document.cookie.substring(r,t))}}return""},getTarckTimeStamp:function(){return`&${this.FIELD_PREFIX}tm=${(new Date).getTime()}`},getTarckWaitTime:function(){return"object"==typeof window.performanc&&window.performance.now?`&${this.FIELD_PREFIX}w=${window.performance.now().toFixed()}`:""},getTarckUbcu:function(){return this.getTarckCookie("WEBF-user_id")},getTarckUbci:function(){return this.getTarckCookie(document.querySelector('meta[name="GLOBEL:ubci"]').content)},getTarckSpcb:function(){return document.querySelector('meta[name="GLOBEL:spcb"]').content},getTarckUbcd:function(){return document.querySelector('meta[name="GLOBEL:ubcd"]').content},getTarckDc:function(){return document.querySelector('meta[name="GLOBEL:dc"]').content},getTarckPageId:function(){return document.querySelector('meta[name="GLOBEL:pageid"]').content},getViewedAllBrowerValue:function(id){var did=document.querySelector(id),img=did.querySelectorAll("img"),imgSkuArr=[],imgBrowserValue=img.forEach(item=>{imgSkuArr.push(eval(`(${item.attributes["data-logsss-browser-value"].value})`).bv)});return imgSkuArr},getDevices:function(){return/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?"m":"PC"},parseTarckUrl:function(e){return!e||/^https?/gi.test(e)?e:/^:/g.test(e)?"https"+e:/^(\/\/)/g.test(e)?"https:"+e:e},addPrefixKey:function(e){return e?(/^glb_/g.test(e)||(e=this.FIELD_PREFIX+e),e):e},renderData:function(e,r){return void 0===r?"":"object"==typeof r?"&"+(e=this.addPrefixKey(e))+"="+JSON.stringify(r):r.trim().length?"&"+(e=this.addPrefixKey(e))+"="+r:""}};module.exports=TarckUtils},function(e,r){const t={xhrPing:(e,r,t)=>{if(!window.XMLHttpRequest)return!0;let a=new window.XMLHttpRequest;return!("withCredentials"in a)||(a.open("POST",e,!0),a.withCredentials=!1,a.setRequestHeader("Content-Type","text/plain"),a.onreadystatechange=function(){4==a.readyState&&(t(),a=null)},a.send(r),!0)},xhrGetPing:e=>{var r=new XMLHttpRequest;r.open("GET",e,!0),r.send()}};e.exports=t}]);