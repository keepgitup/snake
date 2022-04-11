var mapSize = 60 * 60;
// 規劃 opening 按按鈕開始 結束

let gameInterval;
// 假設 按按鈕 就會執行playStart
function gamePlay() {
    //   每0.1秒 跑gameCalculate 算狀態
    gameInterval = setInterval(gameCalculate, 100);
    // console.log(1);
    console.log(gameInterval);
}

// 執行最新畫面
function gameCalculate() {
    latestCanvas();
}

function latestCanvas() {
    var canvas = document.getElementById('canvasId');
    // 畫布上取圖出來 用getContext渲染到context存起來
    var context = canvas.getContext('2d');

    context.fillStyle = "black";
    //區塊 左上角x y坐標 到區塊的寬度 跟高度
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
    context.lineTo(300, 300);
    context.stroke();
    // console.log(context);
}
// 劃蛇&點心
var snake = [];
var snkaeLength = 4;
var desertX = 0;
var desertY = 0;
var step = 0;


//
function mapTable() {
    //地圖直線
    for (var i = 0; i < 60; i++) {
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(10 * i, 0);
        context.lineTo(10 * i, 600);
        context.endPath();
        context.stroke();
    }
    //地圖橫線
    for (var j = 0; j < 60; j++) {
        context.strokeStyle = "lightgray";
        context.beginPath();
        context.moveTo(10 * j, 0);
        context.lineTo(10 * j, 600);
        context.endPath();
        context.stroke();
    }
    //蛇身
    for (var k = 0; k < snkaeLength; k++) {
        context.fillStyle = "#d25a32";
        // 蛇頭獨立
        if (k == snkaeLength - 1) {
            context.fillStyle = "red";
            // 前座標 後長寬

        }
        ctx.fillRect(snkaeLength[k].x, snkaeLength[k].y, 10, 10);
    }

    //暫時放點心圖案
    context.fillStyle = "green";
    contexte.fillRect(desertX, desertY, 10, 10);
    context.fill();

}
//從哪裡開始動
function start() {
    // var snake =[]
    // var snakeLength=3 蛇的剛開始長度(頭 身 尾巴)

    for (var k = 0; k < snakckLength; k++) {
        snake[k] = { x: k * 0, y: 0 };
    }
    // 啟動地圖
    mapTable();
    // 從開始的座標裡也啟動點心
    addDesert();
}



// 累加點心
function addDesert() {
    desertX = Math.floor(Math.random() * 60) * 10;
    desertY = Math.floor(Math.random() * 60) * 10;
    for (var m = 0; m < snkaeLength; m++) {
        if (desertX == snkaeLength[k].x && desertY == snkaeLength[k].y) {

            addDesert();
        }
    }
}

mapTable();