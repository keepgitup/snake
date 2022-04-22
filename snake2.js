window.onload = onPageLoaded();
//開始>>(update)等級 點心 成績
// gameRoutine(移動 吃點心 畫布更新)

// 更新 加櫻桃

//10px 一格 長度
var blockGrid = 10;
// 每10px 走一單位 坐標相關
var blockSelect = 10;
//tx feng
// var snake = {
//     bodySize: 4,
//     bodyA: [{ x: 10 / blockSelect, y: 10 / blockSelect }],
//     bodyGo: { x: 10, y: -10 },
//     head: { width: 10, height: 10 }
// };
var snake = {
    bodySize: 6,
    bodyA: [{ x: blockSelect / 5, y: blockSelect / 5 }],
    // bodyA: [{ x: blockSelect / 1, y: blockSelect / 1 }, { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 13, y: 10 }],
    bodyGo: { x: 2, y: 2 },
    head: { width: 10, height: 380 }
};
// var playInterval;
console.log("snake", snake);
var cherry;
var canvasSize = { width: 420, height: 420, origin: 0 };
var newPart;
var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');
var matchInterval;
var score;
var level;
// 畫布 基本格子
draw();
gridPic();
// drawSk();
startPlay();

function startPlay() {
    draw();
    gridPic();
    drawCherry();
    drawS();
    updateScore(0);
    updateGameLevel(1);

    movePerSec();

    if (snake.bodyA[0].x === cherry.x && snake.bodyA[0].y === cherry.y) {
        eatCheery();
    }

    if (snakeDead()) {}
    bye();


}


function mapPic(p1, p2) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "skyblue";
    ctx.moveTo(p1.x, p1.y);
    // console.log("參數p1x", p1.x);
    // console.log("參數p1y", p1.y);
    ctx.lineTo(p2.x, p2.y);
    // console.log("參數p2x", p2.x);
    // console.log("參數p2y", p2.y);

    // let p2 = 420;
    // let L1=420;
    // ctx.moveTo(20, 0);
    // ctx.lineTo(20, 420);
    // 有stroke就不用這個closepath,重複用
    // ctx.closePath(10, 0);
    // ctx.moveTo(10 * p1, 0);
    // ctx.lineTo(10 * p1, 420);
    ctx.stroke();
}

//畫 布
function draw() {

    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, 420, 420);
    ctx.strokeRect(0, 0, 420, 420);
    console.log("ctx", ctx);
    //畫格子線
    // for (var i = 0; i < body.length; i++)

};

function gridPic() {
    let count = (canvasSize.width / blockGrid) + 1;
    console.log("count值", count);

    for (var i = 0; i < count; i++) {
        let p1 = { x: i * 10, y: canvasSize.height };
        let p2 = { x: i * 10, y: canvasSize.origin };
        let a = { x: canvasSize.origin, y: i * 10 };
        let b = { x: canvasSize.height, y: i * 10 };
        mapPic(p1, p2);
        // console.log("線第", i + "條");
        mapPic(a, b);
        // console.log("線第", i + "條");

    };
}

// ctx.fillStyle = "green";
// ctx.fillRect(10, 10, snake.bodyA[0].x * blockGrid + 1, snake.bodyA[0].y * blockGrid + 1);

// ctx.fillText("蛇去哪裡了???", 100, 150);


// function drawSnake() {
//     ctx.fillStyle = "black";
//     for (var i = 0; i < snake.bodyA.length; i++) {
//         // 20 / blockSelect, 20 / blockSelect, 原預定坐標
//         ctx.fillRect(snake.bodyA[i].x * blockGrid + 1, snake.bodyA[i].y * blockGrid + 1, blockGrid - 1, blockGrid - 1);
//         //先不用累加
//         // snake.bodyA +
//     };
//     console.log("蛇身", snake.bodyA.length);
//     // console.log("蛇頭", snake.bodyA[i].x * blockGrid + 1, blockGrid - 1, snake.bodyA[i].y * blockGrid + 1);

//     //補充物件屬性


// }

function drawS() {

    ctx.fillStyle = "green";
    for (var i = 0; i < snake.bodyA.length; i++) {
        // for (var i = 0; i < snake.bodySize; i++) {
        // 20 / blockSelect, 20 / blockSelect, 原預定坐標

        //!!!! 先出現長度
        // snake.bodyA.push({ x: i + 1, y: 1 });

        ctx.fillRect(snake.bodyA[i].x * blockGrid + 1, snake.bodyA[i].y * blockGrid + 1, blockGrid - 1, blockGrid - 1);
        // ctx.fillRect(snake.bodyA[i].x * blockGrid + 1, snake.bodyA[i].y * blockGrid + 1, blockGrid - 1, blockGrid - 1);
        console.log("確認值", snake.bodyA[i].x * blockGrid + 1, snake.bodyA[i].y * blockGrid + 1);

        console.log("ctx.fillRect", ctx.fillRect(snake.bodyA[i].x * blockGrid + 1, snake.bodyA[i].y * blockGrid + 1, blockGrid - 1, blockGrid - 1));

    };
    // console.log("蛇身", snake.bodyA);
    // console.log("蛇頭", snake.bodyA[i].x * blockGrid + 1, blockGrid - 1, snake.bodyA[i].y * blockGrid + 1);
}

// movePerSec();

function movePerSec() {
    // note: setInterval放在這反而會造成無限循環 因為下面又movePerSec 就會一直往127行跑...
    // setInterval(movePerSec, 1000);

    var newPart = {
        x: snake.bodyA[0].x + snake.bodyGo.x,
        y: snake.bodyA[0].y + snake.bodyGo.y
    };
    console.log("newpart的新增x,y", snake.bodyA[0].x + snake.bodyGo.x, snake.bodyA[0].y + snake.bodyGo.y);
    snake.bodyA.unshift(newPart);
    if (snake.bodyA.length > snake.bodySize) {
        snake.bodyA.pop(newPart);
    }
    // else {

    // }
    console.log("snake.bodyA", snake.bodyA);
    // setTimeout(movePerSec, 1000);
}




//     蛇頭 2nd way
// function drawSk() {


//     ctx.fillStyle = "green";
//     var head = ctx.fillRect(canvasSize.width / 2, canvasSize.height / 2, snake.head.width, snake.head.height, 'green');
//     console.log("蛇頭", head);
//     // 蛇身
//     let bodyA = []
//     let x = bodyA.x - 10;
//     let y = bodyA.y - 10;
//     let newBody;
//     for (var i = 0; i < snake.bodySize; i++) {
//         newBody = ctx.fillRect(x, y, snake.head.width, snake.head.height, 'green')
//         console.log("列印newbody", newBody);
//     }
//     bodyA = snake.bodyA.push(newBody);
//     console.log("bodyA為", bodyA);


// }


function drawCherry() {

    cherry = {
        x: Math.floor(Math.random() * blockSelect),
        y: Math.floor(Math.random() * blockSelect),
    }
    console.log("隨機數字", Math.floor(Math.random() * blockSelect));

    ctx.fillStyle = "red";
    ctx.fillRect(
        cherry.x * blockGrid + 1, cherry.y * blockGrid + 1, blockGrid - 2, blockGrid - 2
    );
    console.log("cherry", cherry);


    console.log("cherry x,y", (cherry.x, cherry.y));

}









// 蛇移動
// 吃到
function eatCheery() {
    // 身體變長(跟原尺寸比)

};
// 沒吃到 撞牆

// 沒吃到 撞倒自己身體


// 功能類 ctx.fillRect()
// 填充繪製 ctx.stroke();
// 邊框繪製 ctx.clip();
// 裁剪 ctx.clearRect(x, y, width, height)
// 清除區域: 本質是將這個區域顏色設置為透明色，rgba(0,0,0,0)





// function onPageLoaded() {
//     //如果系統發出keydown這種事件的時候 就執行presskeydown事件
//     document.addEventListener(‘keydown’, pressKeyDown);
//     }

//     function pressKeyDown(event) {
//     //紀錄原本方向的x值 Y值
//     var originX = snake.direction.x;
//     var originY = snake.direction.y;

//     if (event.keyCode === 37) {
//         console.log("按了<---鍵");
//         snake.direction.x = originY;
//         snake.direction.y = -originX;
//     } else if (event.keyCode === 39) {
//         console.log("按了--->鍵");
//         snake.direction.x = -originY;
//         snake.direction.y = originX;
//     }




function onPageLoaded() {

    document.addEventListener('keydown', pressDown);
}

function pressDown(event) {

    var originX = snake.bodyGo.x;
    var originY = snake.bodyGo.y;


    if (event.keyCode === 37) {
        console.log("按了<---鍵");
        snake.bodyGo.x = originY;
        snake.bodyGo.y = -originX;
    } else if (event.keyCode === 39) {
        console.log("按了--->鍵");
        snake.bodyGo.x = -originY;
        snake.bodyGo.y = originX;
    }
}

function eatCherry() {
    snake.size += 1;
    drawCherry();
    newScore(score + 1);
}


function updateGameLevel(newLevel) {
    level = newLevel;
    if (matchInterval) {
        clearInterval(matchInterval);
    }
    matchInterval = setInterval(movePerSec, 1000 / level);

}

// 成绩更新
function updateScore(newScore) {
    score = newScore;
    document.getElementById('newScoreId').innerHTML = score;
}



function bye() {
    clearInterval(matchInterval);
}

function snakeDead() {

    // 撞牆
    if (snake.bodyA[0].x < 0) {
        return true;
    } else if (snake.bodyA[0].y < 0) {
        return true;
    } else if (snake.bodyA[0].x >= blockSelect) {
        return true;
    } else if (snake.bodyA[0].y >= blockSelect) {
        return true;
    }

    // 撞身體 hit body
    for (var i = 1; i < snake.bodyA.length; i++) {
        // 假如蛇頭疊身體 (===號比== 嚴謹 因為不會亂轉換)
        if (snake.bodyA[0].x === snake.bodyA[i].x && snake.bodyA[0].y === snake.bodyA[i].y) {
            return true;
        }
    }
    return false

}