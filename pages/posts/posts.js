
var postData = require('../../data/posts_dtaa.js')

Page({
  data: {
  },
  onLoad: function (options) {
    this.setData({
      post_key: postData.posts_list
       });
  },

  onCathtap:function(event){
    var postid = event.currentTarget.dataset.postssid;
    wx.navigateTo({
      url: "posts_detail/posts_detail?id="+postid
    })
  },
  onswiperCatchtap:function(event){
    //console.log(event);
    //用target而不是currenttarget是因为，currenttarget是事件捕获的组件这里指swiper(没有ID所以获取不到)，target是当前点击的组件（item和image被点击，他们都有ID，通过冒泡传输进来）
    var postid = event.target.dataset.postsid;
    //console.log(postid);
    wx.navigateTo({
      url: 'posts_detail/posts_detail?id=' + postid,
    })
  }
})
 