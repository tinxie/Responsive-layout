App({
    //设置一个全局变量，用于完善音乐播放界面
   globalData:{
     g_isplayingMusic:false,
     g_currentMusic:null,
     //豆瓣API基地址更改为以下地址，否则出现错误403
     globalurl:"http://t.yushu.im"
   }
})