// 畫布 基本格子

//開始>>(update)等級 點心 成績
// gameRoutine(移動 吃點心 畫布更新)

//
// qq
//

// 更新 加櫻桃

// initial value
var snake = {
    size: 4,
    origin: { x: 0, y: 0 },
};
var cherry = { x: 5, y: 5 };

var canvas = 0;
//10px 一格
var blockGrid = 10;
// 每10px 走一單位
var blockSelect = 10;

// = { heigt = 10;snakeId = 8, width = 6 }

draw();
//畫 布 蛇 心
function draw() {
    var canvas = document.getElementById('canvasId');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //fillRect(x,y,widht,height)
        //ctx.fillStyle = "gray";
        //x,y從畫定的座標出發預設
        ctx.fillRect(0, 0, 418, 418);
        ctx.strokeRect(0, 0, 418, 418);
        console.log("ctx", ctx);
        // ctx.fillStyle = "lightgreen";

        //畫格子線
        for (var i = 1; i < 42; i++) {
            ctx.beginPath();
            console.log("橫線第", i + "條");
            ctx.lineWidth = 6;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(0, i * 10);
            ctx.lineTo(420, i * 10);

            // ctx.fillStyle = 'white';
            ctx.stroke();
        };

        for (var j = 1; j < 42; j++) {
            ctx.beginPath();
            console.log("直線第", j + "條");
            ctx.lineWidth = 6;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(10 * j, 0);
            ctx.lineTo(10 * j, 420);
            //ctx.closePath(0, 0);
            // ctx.fillStyle = 'white';
            ctx.stroke();

        };

        console.log(ctx);
        // for (var i = 0; i < 420 / 10; i++) {

        // }
        // for (var i = 0; i < snake.body.length; i++) {

        //     ctx.fillRect(
        //         ctx.x.snake.body[i] * blockGrid + 0.9,
        //         ctx.y.snake.body[i] * blockGrid + 0.9)

        //     console.log("snakebody", snakebody);
        // } {
        //     ctx.fillStyle = "lightpink";
        //     ctx.roundedRect(

        //         cherry.x * blockGrid + 1,
        //         cherry.y * blockGrid + 1,
        //     )
        // }
        // return ctx;
    } else {
        return "登登 遊戲故障";
    }
}



function startPlay() {
    // 開始位置
    //移動
    //成績更新
    //畫布更新
    //櫻桃開始出現(隨機)
    cherry = {
        // x:"";
        // y:"";
    }
}

// 蛇移動
// 吃到
function eatCheery() {
    // 身體變長(跟原尺寸比)

}
// 沒吃到 撞牆

// 沒吃到 撞倒自己身體


// 功能類 ctx.fillRect()
// 填充繪製 ctx.stroke();
// 邊框繪製 ctx.clip();
// 裁剪 ctx.clearRect(x, y, width, height)
// 清除區域: 本質是將這個區域顏色設置為透明色，rgba(0,0,0,0)