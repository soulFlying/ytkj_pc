/**
 * Created by Ether on 2017/7/6.
 */

var lin = document.getElementById('line')
var line = lin.getContext('2d')
lin.width = 880
lin.height = 600

function Anim (opt) { // 初始化值
  this.opt = opt
}
// node 表示画布节点
// staX 表示开始x坐标
// staY 表示开始y坐标
// len表示终点坐标，
// timing表示运行的间隔时间，
// num表示坐标增长的大小
// direc表示判断绘制线条的方向，false表示X轴，ture表示Y轴
// lw表示线宽的大小
// color 表示绘制线条颜色
Anim.prototype.draw = function () { // 绘制直线的线条
  var opt = this.opt; // 设置对象的属性
  var adx = opt.staX
  var ady = opt.staY
  var that = {
    x: opt.staX,
    y: opt.staY
  }
  var num = 0

  var setTime = setInterval(function () {
    opt.direc ? opt.len > ady ? ady += opt.num : ady -= opt.num : opt.len > adx ? adx += opt.num : adx -= opt.num
    // if (adx == opt.len || ady == opt.len) { // 停止循环
    //   clearInterval(setTime)
    //   console.log(adx,ady,opt.len)
    // }
  
        num++
      var t = num/100
      if (t>=0.577){
        clearInterval(setTime)
      }
    opt.Node.beginPath(); // 开始绘制线条
    opt.Node.moveTo(that.x, that.y)
    opt.Node.lineTo(adx, ady)
    opt.Node.lineWidth = opt.lw || 1
    opt.Node.strokeStyle = opt.color
    opt.Node.stroke()
  }, opt.timing)
}

Anim.prototype.txt = function (opc, font, text, x, y) { // 绘制文字
  line.beginPath()
  line.fillStyle = 'rgba(255,255,255,' + opc + ')'
  line.font = font + 'px 黑体'
  line.fillText(text, x, y)
}
Anim.prototype.img = function (opc, src, x, y, w, h) { // 绘制图片
  var img = new Image()
  img.src = src
  line.fillStyle = 'rgba(255,255,255,' + opc + ')'
  line.drawImage(img, x, y, w, h)
}

var line1 = new Anim({ // 实例
  Node: line,
  color: 'skyblue',
  staX: 350,
  staY: 305,
  len: 320,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4

})

var line2 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 320,
  staY: 305,
  len: 190,
  timing: 20,
  num: 2,
  direc: true,
  lw: 4
})

var line3 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 320,
  staY: 190,
  len: 250,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line4 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 340,
  staY: 420,
  len: 380,
  timing: 20,
  num: 2,
  direc: true,
  lw: 4
})

var line5 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 340,
  staY: 380,
  len: 250,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line6 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 520,
  staY: 240,
  len: 555,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line7 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 555,
  staY: 240,
  len: 120,
  timing: 20,
  num: 2,
  direc: true,
  lw: 4
})

var line8 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 555,
  staY: 125,
  len: 595,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line9 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 520,
  staY: 350,
  len: 580,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line10 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 580,
  staY: 350,
  len: 290,
  timing: 20,
  num: 2,
  direc: true,
  lw: 4
})

var line11 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 580,
  staY: 290,
  len: 660,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line12 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 540,
  staY: 420,
  len: 610,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

var line13 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 610,
  staY: 420,
  len: 460,
  timing: 20,
  num: 2,
  direc: true,
  lw: 4
})

var line14 = new Anim({
  Node: line,
  color: 'skyblue',
  staX: 610,
  staY: 460,
  len: 680,
  timing: 20,
  num: 2,
  direc: false,
  lw: 4
})

// 文本图片函数
function setText (line, set, out, text, font, x, y, test, src, x1, y1, w, h) {
  setTimeout(function () {
    var num = 0
    var time = setInterval(function () {
      num++
      var t = num / 100
      if (t >= 0.5) {
        clearInterval(time)
      }
      test.txt(t, font, text, x, y)
      test.img(t, src, x1, y1, w, h)
    }, set)
    line.draw()
  }, out)
}

// 绘制事件函数
function setTime (line, out) {
  setTimeout(function () {
    line.draw()
  }, out)
}
$(window).bind('scroll', function (event) {

  // 窗口的高度+看不见的顶部的高度=屏幕低部距离最顶部的高度
  var thisButtomTop = parseInt($(window).height()) + parseInt($(window).scrollTop())
  var thisTop = parseInt($(window).scrollTop()); // 屏幕顶部距离最顶部的高度
  var PictureTop = parseInt($('#gameContainer').offset().top)
  if (PictureTop >= thisTop && PictureTop <= thisButtomTop) {
    line1.draw(); // 执行绘制
    line4.draw()
    line6.draw()
    line9.draw()
    line12.draw()

    setTime(line2, 1100); // 延时定时器
    setTime(line7, 500)
    setTime(line10, 1300)
    setTime(line13, 1400)

    var test = new Anim(); // 绘制文字实例
    setText(line3, 30, 2300, '情感陪伴', 16, 150, 195, test, 'http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/8.png', 20, 210, 210, 60)
    var test2 = new Anim()
    setText(line5, 100, 300, '信息查询', 16, 150, 385, test2, 'http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/10.png', 20, 400, 210, 40)
    var test3 = new Anim()
    setText(line8, 30, 2000, '头脑容量', 16, 610, 125, test3, 'http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/2.png', 610, 140, 210, 40)
    var test4 = new Anim()
    setText(line11, 30, 2000, '3D立体交互', 16, 680, 295, test4, 'http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/4.png', 680, 310, 210, 40)
    var test5 = new Anim()
    setText(line14, 30, 2100, '成长能力', 16, 700, 460, test5, 'http://or5y02dsh.bkt.clouddn.com/images/front/imgRbt/6.png', 700, 475, 210, 60)

    $(window).unbind('scroll')
  }
})
