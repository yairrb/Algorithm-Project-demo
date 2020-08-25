
class Drawer {



    constructor() {
        this.canvas = document.getElementById("myCanvas");

        this.x = this.canvas.width;
        this.y = this.canvas.height;

    }


    drawColum(columIndex, height, color) {
        var ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(columIndex * 25, this.y - (height + 50), 22, height);
        ctx.fillStyle = color;
        ctx.shadowColor = "yellow";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();
    }

    draw(arrayColumns) {

        this.clearCanvas();
        for (let index = 0; index < arrayColumns.length; index++) {
            let column = arrayColumns[index];
            this.drawColum(index + 1, column, "white");
        }
    };

    
    /* clear the whole screen*/

    clearCanvas() {
        var ctx = this.canvas.getContext("2d");

        ctx.clearRect(0, 0, this.x, this.y);
    }
}

