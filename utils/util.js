//此页面放置公共方法
// 星级评分思维
// 根据获取的分数来判断，先设想将0代表没有点亮，1代表点亮了，将他们放入数组，假如分数为30，则表现数据形式为
// [1,1,1,0,0]
function getStar(star){
  //  将传过来的评分截取字符串的第一位
  var num = star.toString().substring(0,1);
  var arr=[];
  // 一共有五颗星星所以循环五次，分别判定星星的数值为1或0
  //这里的循环i必须从1 开始，1到5，否则传入的star全部为5颗星无用。
  for(var i=1;i<=5;i++){
    if(i<=num){
       arr.push(1);
    }else{
      arr.push(0);
    }
  }
  return arr;
}
//将发送HTTP请求提取城公共方法,异步请求需要一个回调函数
function http(url,callBack) {
  wx.request({
    url: url,
    method: "GET",
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
     callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}
//将模块输出
module.exports = {
  getStars: getStar,
  http:http
}
