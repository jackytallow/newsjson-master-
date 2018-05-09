var util = require('../../utils/util.js');
Page({
    data: {
        inputValue:''
    },
    onLoad:function(options){
        this.nid = options.id;
        var that=this;
        //调用共用方法，根据id取新闻信息
        util.getNewsById(this.nid,function(news){
            that.setData({
                comments:news.comments
            });
        });
    },

    //同步评论框输入内容
    bindCommentInput:function(e){
        this.setInputVal(e.detail.value);
    },

    /*设置评论框内容*/
    setInputVal:function(val){
        this.setData({
            inputValue:val
        });
    },

    /*发表评论*/
    submitCommentInfo:function(){
        if(this.data.inputValue==''){
            return;
        }
        var data={
            id:123,
            nid:this.nid,
            name:'张三',
            avatar:'http://p0.pstatp.com/origin/3791/5070639578',
            content:this.data.inputValue,
            time:new Date().getTime()
        }

        //http请求
        //wx.request

        //数据添加到数组第一项，splice方法很强大，但是比较难理解，大家可以自己研究下
        var comments=this.data.comments;
        comments.splice(0,0,data);
        this.setData({
            comments:comments
        });
        this.setInputVal('');  //清空评论框
        wx.showToast({
            title:'评论成功',
            duration:1000
        });
    }
})