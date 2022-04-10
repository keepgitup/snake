// 規劃 opening 按按鈕開始 結束

let gameInterval
// 假設 按按鈕 就會執行playStart
function gamePlay() {
    //   每1.2秒 跑gameCalculate 算狀態
    gameInterval = setInterval(gameCalculate, 1200)
    console.log(1)
    console.log(gameInterval)
}

// 執行最新畫面
function gameCalculate(){
    latestCanvas()
}

function latestCanvas(){
var canvas=document.getElementById('canvasId')
// 畫布上取圖出來 用getContext渲染到context存起來
var context=canvas.getContext('2d')

context.fillStyle="black"
//區塊 左上角x y坐標 到區塊的寬度 跟高度
context.fillRect(0,0, canvas.clientWidth, canvas.height)
console.log(context)
}
