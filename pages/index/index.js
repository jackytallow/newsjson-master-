var util = require('../../util/util.js');
Page({
    data: {
        toView: "red",
    },
    onLoad:function(){
      var that=this;
        util.getAllData(function(news){
              that.setData({
                    news:that.detDateFormat(news)
                });
          });
    },

    detDateFormat:function(news){
        var len=news.length,item;
        for(var i=0;i<len;i++){
            item=news[i];
            item.time=new Date(item.time*1000).format('yyyy-MM-dd hh:mm');
        }
        return news;
    },

    showNewsDetail:function(e){
        var id=e.currentTarget.dataset.id
        wx.navigateTo({
            url:'/pages/detail/detail?id='+id
        });
    }
})