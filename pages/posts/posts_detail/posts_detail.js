
var postdata =require("../../../data/posts_dtaa.js");
var app = getApp();
Page({
  data:{
      isplayingMusic:false
    
  //   //创建data来存储数据，使下面的事件可以获取到onload里面的ID
     },
    onLoad:function(option){
        var postid = option.id;
  //       //将postid放入数组中，给他设置一个属性currentid来存储ID
        this.data.currentid = postid;
        var postData = postdata.posts_list[postid];
       this.setData({
         postdata_key:postData
       });

  //      // 读取所有的缓存状态
       var postscollected = wx.getStorageSync('postcollected')
  //      //拿到其中一个的缓存状态，依靠ID来获取,在此之前需要先判断缓存状态是否为空，缓存存在才能读取
       if(postscollected){
         var postcollected = postscollected[postid];
  //        //做数据更新，将变量绑定上去,从而在前端页面可以读取控制
         this.setData({
           collected: postcollected
         })
       }else{
  //          //如果没有获取到缓存状态，证明缓存结构体为空，不存在我们就要让他存在，先设置一个变量为空，由于缓存状态不存在，所以判断当前未被收藏，状态为false，最后放入缓存
         var postscollected={};
         postscollected[postid]=false;
  //        //放入缓存的键要和上面定义的键一样，值就是定义的缓存
         wx.setStorageSync("postcollected", postscollected)
       }

      //将全局变量状态与本地图标状态绑定，通过监听函数控制全局变量的改变
       if (app.globalData.g_isplayingMusic && app.globalData.g_currentMusic == postid){
           this.setData({
             isplayingMusic:true
           })
       }

    },
    onCatchtap:function(event){
  //     //通过缓存来判断是否被收藏，获取缓存，获取当前缓存,取反，收藏变成未收藏
      var postscollected = wx.getStorageSync('postcollected');
      var postcollected = postscollected[this.data.currentid];
      postcollected=!postcollected;
  //     //更新缓存,将上面的缓存状态更新到整体的某一个缓存状态中
      postscollected[this.data.currentid] = postcollected;
  //     //更新文章是否收藏的缓存值
      wx.setStorageSync('postcollected', postscollected);
  //     //更新数据绑定变量，从而实现切换图片
      this.setData({
  //      // 当前值是postcollected,将当前缓存状态更新到前台
        collected: postcollected
      });

       wx.showToast({
  //        //用postcollected判断状态
         title: postcollected ? "收藏成功" :"取消成功",
         duration:1000 
       })
        

    },
    onsharetap:function(event){
      wx.showActionSheet({
        itemList: [
          "分享到微信",
          "分享到微博",
          "分享到朋友圈",
          "分享到QQ",
          "分享到facebook"
        ],
        itemColor:"#405f80"

      })
      
    },
    onmusictap:function(event){
      //console.log(postdata);
      //获取ID
      var dataid = this.data.currentid;
      //获取状态
      var isplayingMusic = this.data.isplayingMusic;
      //如果为false，暂停
      if (isplayingMusic){
        wx.pauseBackgroundAudio();
        //绑定数据到前台，判断显示什么图片
        this.setData({
          isplayingMusic:false
        })
      }else{
        wx.playBackgroundAudio({
          dataUrl: postdata.posts_list[dataid].music.url,
          title: postdata.posts_list[dataid].music.title,
          coverImgUrl: postdata.posts_list[dataid].music.coverImage,
        });
          this.setData({
            isplayingMusic: true
          })
      }

      var that  = this;
      wx.onBackgroundAudioPlay(function(){
        that.setData({
          isplayingMusic: true
        })
        //通过监听函数来控制全局变量的改变，这里意思是说，如果坚挺到音乐在播放，则全局变量也为true
        app.globalData.g_isplayingMusic=true
        app.globalData.g_currentMusic = that.data.currentid
      }),
        wx.onBackgroundAudioPause(function(){
        that.setData({
          isplayingMusic: false
        })
        app.globalData.g_isplayingMusic=false
        app.globalData.g_currentMusic=null
        })
     }
      
})