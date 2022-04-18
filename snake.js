// 60*60 像素
var mapSize = 20;

// 格子60*60
var mapCount = 20;
// 規劃 opening 按按鈕開始 結束

var gameInterval;

// 劃蛇&點心
var snake;
var desert;
// var snkaeLength = 4;
var score;
var level;

function gamePlay() {
    //   每0.1秒 跑gameRoutine 算狀態
    snake = {
        body: [
            { x: mapCount / 2, y: mapCount / 2 }
        ],
        size: 5,
        direction: { x: 0, y: -1 }
    }
    putDesert();
    updateScore(0);
    updateGameLevel(1);
}

//??畫面 時單時偶?
//////////////1.畫 面////////////////

//<----------等級要更---------->
function updateGameLevel(newLevel) {
    level = newLevel;

    if (gameInterval) {
        clearInterval(gameInterval);
    }

    //setInterval用法
    //https://www.runoob.com/jsref/met-win-setinterval.html
    gameInterval = setInterval(gameRoutine, 100 / level);
    //console.log(gameInterval);
}

// 成绩更新
function updateScore(newScore) {
    score = newScore;
    document.getElementById('scoreId').innerHTML = score;
}

// 一打開就載畫面
window.onload = onPageLoaded;

//////////2. 上點心//////////
function putDesert() {
    desert = {
        x: Math.floor(Math.random() * mapCount),
        y: Math.floor(Math.random() * mapCount)
    }

    // for (var i = 0; i < snake.body.length; i++) {
    //     if (snake.body[i].x === desert.x && snake.body[i].y === desert.y) {
    //         putDesert();
    //         //何時rtn 何時break
    //         break;
    //     }
    // }
}

function eatDesert() {
    snake.size += 1;
    putDesert();
    updateScore(score + 1);
    console.log("成績", score);
}


function onPageLoaded() {
    //如果系統發出keydown這種事件的時候 就執行presskeydown事件
    document.addEventListener('keydown', pressKeyDown);
}

function pressKeyDown(event) {
    //紀錄原本方向的x值 Y值
    var originX = snake.direction.x;
    var originY = snake.direction.y;


    if (event.keyCode === 37) {
        console.log("按了<---鍵");
        snake.direction.x = originY;
        snake.direction.y = -originX;
    } else if (event.keyCode === 39) {
        console.log("按了--->鍵");
        snake.direction.x = -originY;
        snake.direction.y = originX;
    }
}




//<----------畫布 蛇 點心--------->
function latestCanvas() {
    // 畫布上取圖出來 用getContext渲染到context存起來
    var canvas = document.getElementById('canvasId');
    var context = canvas.getContext('2d');


    // console.log("context", context);

    context.fillStyle = "lightgray";
    //區塊 左上角x y坐標 到區塊的寬度 跟高度
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "lime";
    // 動次畫蛇身
    for (var i = 0; i < snake.body.length; i++) {
        //console.log(snake);
        context.fillRect(
            // 空格 縫隙
            snake.body[i].x * mapSize + 1,
            snake.body[i].y * mapSize + 1,
            mapSize - 1,
            mapSize - 1,

        )
        console.log(snake.body[i].x * mapSize + 1);
    }
    // 畫蛇點心
    context.fillStyle = 'red'
    context.fillRect(
        desert.x * mapSize + 1,
        desert.y * mapSize + 1,
        //上下左右 都隔一個像素出來
        mapSize - 10,
        mapSize - 1
    )
}


//<----------算狀態 動作畫面 (38行呼叫) ---一般動-蛇掛-吃東西----->
function gameRoutine() {
    // 移動3態
    // 紅字
    moveSnake();

    // GG
    if (snakeOver()) {
        gg();
        // gg後就回gameroutine
        return;
    }
    // 吃東西
    if (snake.body[0].x === desert.x && snake.body[0].y === desert.y) {
        eatDesert();
    }
    // 都不是時 地圖更新
    latestCanvas();
}

//gg 裡面間隔清空
function gg() {
    clearInterval(gameInterval);
}

// 蛇掛了 圖樣
function snakeOver() {

    // 撞牆
    if (snake.body[0].x < 0) {
        return true;
    } else if (snake.body[0].y < 0) {
        return true;
    } else if (snake.body[0].x >= mapCount) {
        return true;
    } else if (snake.body[0].y >= mapCount) {
        return true;
    }

    // 撞身體 hit body
    for (var i = 1; i < snake.body.length; i++) {
        // 假如蛇頭疊身體 (===號比== 嚴謹 因為不會亂轉換)
        if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
            return true;
        }
    }
    return false
}

// <----------移動蛇期間---------->
function moveSnake() {
    var newMapGrid = {
        // 問
        x: snake.body[0].x + snake.direction.x,
        y: snake.body[0].y + snake.direction.y
    }
    snake.body.unshift(newMapGrid);
    //
    if (snake.body.length > snake.size) {
        snake.body.pop();
    }
}

// function updateCanvas() {
//     var canvas = document.getElementById('canvasId')
//     var context = canvas.getContext('2d')

//     context.fillStyle = 'black'
//     context.fillRect(0, 0, canvas.width, canvas.height)

//     context.fillStyle = 'blue'
//     for (var i = 0; i < snake.body.length; i++) {
//         context.fillRect(
//             // ask...
//             snake.body[i].x * mapSize + 1,
//             snake.body[i].y * mapSize + 1,
//             mapSize - 1,
//             mapSize - 1
//         )
//     }

//     context.fillStyle = 'red'
//     context.fillRect(
//             desert.x * mapSize + 1,
//             desert.y * mapSize + 1,
//             //上下左右 都空一個像素出來
//             mapSize - 1,
//             mapSize - 1
//         )
//         // console.log("context.fillStyle", context.fillStyle);
// }


// context.lineTo(300, 300);
// context.stroke();
// console.log(context);

// 暂关
// function mapTable() {
//     //地圖直線
//     for (var i = 0; i < 60; i++) {
//         context.strokeStyle = "white";
//         context.beginPath();
//         context.moveTo(10 * i, 0);
//         context.lineTo(10 * i, 600);
//         context.endPath();
//         context.stroke();
//     }
//     //地圖橫線
//     for (var j = 0; j < 60; j++) {
//         context.strokeStyle = "lightgray";
//         context.beginPath();
//         context.moveTo(10 * j, 0);
//         context.lineTo(10 * j, 600);
//         context.endPath();
//         context.stroke();
//     }
// //蛇身
// for (var k = 0; k < snkaeLength; k++) {
//     context.fillStyle = "#d25a32";
//     // 蛇頭獨立
//     if (k == snkaeLength - 1) {
//         context.fillStyle = "red";
//         // 前座標 後長寬

//     }
//     ctx.fillRect(snkaeLength[k].x, snkaeLength[k].y, 10, 10);
// }

// //暫時放點心圖案
// context.fillStyle = "green";
// context.fillRect(desertX, desertY, 10, 10);
// context.fill();

// //從哪裡開始動
// function start() {
//     // var snake =[]
//     // var length=3 蛇的剛開始長度(頭 身 尾巴)

//     for (var k = 0; k < length; k++) {
//         snake[k] = { x: k * 0, y: 0 };
//     }
//     // 啟動地圖
//     mapTable();
//     // 從開始的座標裡也啟動點心
//     addDesert();
// }



// // 累加點心
// function addDesert() {
//     desertX = Math.floor(Math.random() * 60) * 10;
//     desertY = Math.floor(Math.random() * 60) * 10;
//     for (var m = 0; m < snkaeLength; m++) {
//         if (desertX == snkaeLength[k].x && desertY == snkaeLength[k].y) {

//             addDesert();
//         }
//     }
// }

// mapTable();