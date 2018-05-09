function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/*
 *拓展Date方法。得到格式化的日期形式
 *date.format('yyyy-MM-dd')，date.format('yyyy/MM/dd'),date.format('yyyy.MM.dd')
 *date.format('dd.MM.yy'), date.format('yyyy.dd.MM'), date.format('yyyy-MM-dd HH:mm')   等等都可以
 *使用方法 如下：
 *                       var date = new Date();
 *                       var todayFormat = date.format('yyyy-MM-dd'); //结果为2015-2-3
 *Parameters:
 *format - {string} 目标格式 类似('yyyy-MM-dd')
 *Returns - {string} 格式化后的日期 2015-2-3
 *
 */
(function(){
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
})()



/*
 * 得到得到 相应的新闻.
 * paras：
 * callback- {fn} 回调方法
 */
function getAllData(callback){
        wx.request({
            url: getApp().data.servsers,
            data: {},
            method: 'GET',
            header: {
                'content-type':'application/json'
            },
            success: function(res){
                var news=res.data.news
                callback(news);
            },
            fail: function(res) {
                console.log(res);
            },
            complete: function() {
            }
        })

    }

/*
 * 通过id得到得到 相应的新闻.
 * 具体项目开发时，直接传递id，后台应该返回相应的数据，不需要全部加载再过滤
 * paras：
 * id - {int} 新闻id
 * callback- {fn} 回调方法
 */
function getNewsById(id,callback){
    wx.request({
        url: getApp().data.servsers ,
        data: {},
        method: 'GET',
        header: {
            'content-type':'application/json'
        },
        success: function(res){
            var news=res.data.news,
                len=news.length,item;
            for(var i=0;i<len;i++){
                item=news[i];
                if(item.id==id) {
                    item.time = new Date(item.time * 1000).format('yyyy-MM-dd hh:mm');
                    break;
                }
            }
            callback(item);
        },
        fail: function(res) {
            console.log(res);
        },
        complete: function() {
        }
    })

}

module.exports = {
    formatTime: formatTime,
    getNewsById:getNewsById,
    getAllData:getAllData
}