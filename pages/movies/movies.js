var starss = require("../../utils/util.js");
var app = getApp();
//console.log(app);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // `在这里设置三个结构组变量，用于区分不同类型电影模块
    top:{},
    comingsoon:{},
    inteaer:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var top = app.globalData.globalurl + "/v2/movie/top250?start=0&&count=3";
    var comingsoon = app.globalData.globalurl + "/v2/movie/coming_soon?start=0&&count=3";
    var inteaer = app.globalData.globalurl + "/v2/movie/in_theaters?start=0&&count=3"

    // `将结构组变量分别传入,作为一个key，注意下面的参数传递
    this.getmoviemessage(top,"top","top250");
    this.getmoviemessage(comingsoon,"comingsoon","即将上映");
    this.getmoviemessage(inteaer,"inteaer","最近热映");
  },

// `加一个参数，
  getmoviemessage:function(url,settedkey,categorytitle){
    var that = this;
    wx.request({
       url: url,
       method:"GET",
       header: {
         'Content-Type': 'json'
       },
       success:function(res){
           //console.log(res);
           //成功之后调用处理当前数据的函数，传入数组注意that=this

         that.currentdata(res.data, settedkey, categorytitle); 
          //  console.log(res.data);
       },
       fail:function(error){
         console.log('fail');
              }
     })
  },
// 绑定更多页面
  onCatchtapMore:function(event){
    var more = event.currentTarget.dataset.categorymore;
    // console.log(more) 
     wx.navigateTo({
       url:"movies_more/movies_more?category="+more
        
     });
    //  console.log(event)

  },
 
  //单独分离出来当前数组
  currentdata: function (moviedata, settedkey, categorytitle){
    var some = [];

    for (var mid in moviedata.subjects){
      var title = moviedata.subjects[mid].title;
      if(title.length>6){
         title = title.substring(0,6)+"...";
      }
   
      var somedata = {
           stars:starss.getStars(moviedata.subjects[mid].rating.stars),
           title:title,
           movieId: moviedata.subjects[mid].id,
           average:moviedata.subjects[mid].rating.average,
           imgUrl: moviedata.subjects[mid].images.large,

      };

    
      // console.log(somedata)

      some.push(somedata);

    }
// `如何对应相应的电影数据和电影类型

    var moviedata={};
    // `设置一个结构组变量，将不同电影类型的参数传入，相当于key，key=some，就将数据分别传递了
    moviedata[settedkey]={
      // `这里是为了使templatelist不用循环，所以把不同电影类型整合成一个key名叫movies，这样在模板中就可以直接使用一个key名达到分别绑定的效果。
      movies : some,
      categorytitle: categorytitle
    };
    this.setData(moviedata);
    
     }
      
})