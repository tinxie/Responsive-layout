
// pages/movies/movies_more/movies_more.js
//引入APP和util
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //要做数据绑定，就要在这里说明
    movies:{},
     navigateTitle:'',
     requestUrl: '',
     totalCount: 0,
     isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //
    console.log(options); 
    var category = options.category;
    console.log(category);
    this.data.navigateTitle =category;
    var dataURL = "";
    switch(category){
      case '正在热映':
        dataURL = app.globalData.globalurl + "/v2/movie/in_theaters";
            break;
      case '即将上映':
        dataURL = app.globalData.globalurl +"/v2/movie/coming_soon";
            break;
      case 'top250':
        dataURL = app.globalData.globalurl +"/v2/movie/top250";
            break;
    }
    //将dataUrl从一个函数传入到另一个函数中，利用中间data对象来保存变量，赋值给data对象，就可以在另一个函数中拿到dataUrl
    this.data.requestUrl = dataURL;
    //别忘记加this
     util.http(dataURL,this.processDoubanData)
  },
  onScrollLower:function(event){
     var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20"
    util.http(nextUrl, this.processDoubanData)
  },

  processDoubanData: function (moviedata) {
   console.log(moviedata);
    var movies = [];
    for (var mid in moviedata.subjects) {
      var title = moviedata.subjects[mid].title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var somedata = {
        title: title,
        movieId: moviedata.subjects[mid].id,
        average: moviedata.subjects[mid].rating.average,
        imgUrl: moviedata.subjects[mid].images.large,
        stars: util.getStars(moviedata.subjects[mid].rating.stars)
      };
      // console.log(somedata)
      movies.push(somedata);
    }
    // `如何对应相应的电影数据和电影类型
    var moviedata = {};
    // `设置一个结构组变量，将不同电影类型的参数传入，相当于key，key=some，就将数据分别传递了
    var totalMovies = {};
    //每一次数据绑定之前都把totalcount加20
   if(!this.data.isEmpty){
     //不是空的就将数据加在后面
     totalMovies = this.data.movies.concat(movies);
   }else{
     totalMovies = movies;
     this.data.isEmpty = false;
   }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
  },
  // 设置动态导航栏标题,使用两个函数之间共用数据的方法，注意生命周期函数的大小写不要写错啦
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
      
    })
  }
})