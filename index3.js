draw()

function draw() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    function Rect(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    console.log("rect", Rect());

    Rect.prototype.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    function Snake(length = 0) {
        this.length = length;
        this.head = new Rect(canvas.width / 2, canvas.height / 240, 40, 43)
    }

}