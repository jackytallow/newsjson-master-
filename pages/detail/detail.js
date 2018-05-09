var util = require('../../utils/util.js');
Page({
    data: {

    },
    onLoad:function(options){
        this.nid = options.id;
        var that=this;
        util.getNewsById(this.nid,function(news){

            that.setData({
                news:news
            });
        });
    },

    /*给新闻点赞*/
    likeNews:function(){
        //提交点赞数据到后台
        var news=this.data.news;
        if(!news.isLike){
            news.likeCounts++;
        }else{
            news.likeCounts--;
        }
        news.isLike=!news.isLike;
        this.setData({
            news:news
        });

        //提交数据库
        //wx.request({
        //    url:'http://127.0.0.1/postDataPhp/contentype.php',
        //    data:{name:1,type:'like'},
        //    method:'post',
        //    header: {
        //        'content-type': 'application/json'
        //    },
        //    success:function(res){
        //        wx.showToast({
        //            title:'操作成功',
        //            duration:1000,
        //        });
        //    },
        //    error:function(res){
        //        wx.showToast({
        //            title:'操作失败，请重试',
        //            duration:1000,
        //        });
        //    }
        //});
        wx.showToast({
            title:'操作成功',
            duration:1000,
        });

    },
    /*显示评论信息*/
    showComments:function(){
        wx.navigateTo({
            url:'/pages/comment/comment?id='+this.nid
        });
    },
})