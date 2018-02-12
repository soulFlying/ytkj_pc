
var lin = document.getElementById('line');
var ctx = lin.getContext('2d');
lin.width = 800;
lin.height = 600;
// 一个保存关键拐点的数组
// var pointList = [
//   [{ x1: 250, y1: 320 }, { x2: 350, y2: 320 }], 
//   [{ x1: 350, y1: 320 }, { x2: 350, y2: 120 }], 
//   [{ x1: 350, y1: 120 }, { x2: 200, y2: 120 }]
//   ];

var pointList = [
    [{x1:500,y1:430}, {x2:580,y2:430}],
    [{x1:580,y1:430}, {x2:580,y2:480}],
    [{x1:580,y1:480}, {x2:670,y2:480}],
]

// var pointList2 = [
//     [{x1:480,y1:350}, {x2:560,y2:350}],
//     [{x1:580,y1:430}, {x2:580,y2:380}],
//     [{x1:580,y1:480}, {x2:670,y2:480}],
// ]


function getArr(_ref, _ref2) {
    var x1 = _ref.x1;
    var y1 = _ref.y1;
    var x2 = _ref2.x2;
    var y2 = _ref2.y2;

    // 获取一条竖线或者横线上每一点的坐标
    var list = [];
    var gapX = Math.abs(x2 - x1);
    var isCol = !gapX;

    if (isCol) {
        for (var i = y1; i < y2; i++) {
            list.push(new Point(x1, i));
        }
    } else {
        for (var i = x1; i < x2; i++) {
            list.push(new Point(i, y1));
        }
    }
    return list;
}

function getList(list) {
    // 从一堆拐点对象中获取一条路径上每一点的坐标
    return list.reduce(function (prev, arr) {
        return prev.concat(getArr(arr[0], arr[1]));
    }, []);
}

var list = getList(pointList);
var timer = setInterval(function () {
    return list.length ? dorwLine(list.shift()) : clearInterval(timer);
}, 0);

var list2 = getList(pointList2);
var timer2 = setInterval(function () {
    return list2.length ? dorwLine(list2.shift()) : clearInterval(timer2);
}, 0);

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function dorwLine(_ref3) {
    var x = _ref3.x;
    var y = _ref3.y;
    ctx.fillStyle='skyblue';
    ctx.fillRect(x, y, 4, 4);
    
}