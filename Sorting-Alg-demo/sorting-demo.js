document.addEventListener("DOMContentLoaded", function () {

    /*
    here we are going to:
    1) draw the columns in a simple and clean way
    2) recreate a sorting algorithm
    3)make it looks good :D
    
    */

    var canvas = document.getElementById("myCanvas");


    var width = canvas.width;
    var height = canvas.height;
    var offset = 2;
    var w = 5;
    var pilars = Math.floor(width / (w + offset));
    var columns = new Array(pilars);
    var states = new Array(pilars);

    function setup() {

        //TODO: make it from random heigth
        for (let i = 0; i < pilars; i++) {
            columns[i] = getRandomInt(5, 480);
            states[i] = -1;
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //DRAWING FUNCTIONS
    function draw() {
        clearCanvas();
        for (let i = 0; i < columns.length; i++) {
            if (states[i] == 1) {
                drawColum(i, "red");
            } else if (states[i] == 0) {
                drawColum(i, "gray");
            } else {
                drawColum(i, "white");
            }
        }
    };

    function drawColum(position, color) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        if (position > 0) {
            ctx.rect(position * (w + offset), height - (columns[position] + 20), w, columns[position]);
        } else {
            ctx.rect(position * (w), height - (columns[position] + 20), w, columns[position]);
        }
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };

    function clearCanvas() {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, width, height);
    };

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    async function heapSort() {
        let size = columns.length;

        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            await heapify(size, i); // size and root
            states[i] = 1;
            draw();
        }

        for (let j = size - 1; j >= 0; j--) {
            await swap(0, j);
            draw();
            await heapify(j, 0);
        }

    }

    async function heapify(size, root) {
        let leftLeaf = 2 * root + 1;
        let rightLeaf = 2 * root + 2;
        let maxValue = root;
        states[root] = 1;
        draw();

        if (leftLeaf < size && columns[leftLeaf] > columns[maxValue]) {
            maxValue = leftLeaf;
        }
        if (rightLeaf < size && columns[rightLeaf] > columns[maxValue]) {
            maxValue = rightLeaf;
        }
        if (root != maxValue) {

            draw();
            await swap(root, maxValue);
            await heapify(size, maxValue);
        }

        states[root] = -1;
        draw();
    }

    async function quickSort(start, end) {
        if (start >= end) {
            return;
        }
        let index = await quickSortPartition(start, end);
        states[index] = -1;
        await Promise.all([quickSort(start, (index - 1)), quickSort(index + 1, end)]);

        draw();
    }

    async function quickSortPartition(start, end) {

        let pivotIndex = start
        let pivot = columns[end];
        states[pivotIndex] = 1;
        draw();
        for (let i = start; i < end; i++) {
            if (columns[i] < pivot) {
                await swap(i, pivotIndex);
                states[pivotIndex] = -1;
                pivotIndex++;
                states[pivotIndex] = 1;
                draw();
            }
        }
        await swap(pivotIndex, end);
        draw();
        return pivotIndex;
    }

    async function swap(index1, index2) {
        await sleep(2);

        let tempValue = columns[index1];
        columns[index1] = columns[index2];
        columns[index2] = tempValue;
    }

    //async value allow us to write a promise based code like if it was synchronous
    async function bubbleSort() {
        for (let i = 0; i < columns.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                // draw();
                if (columns[i] < columns[j]) {
                    states[j] = 1;
                    draw();
                    await swap(i, j);
                }
                states[j] = -1;
                draw();
            }
        }

    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    setup();
    // bubbleSort();
    quickSort(0, columns.length - 1);
    // heapSort();
    draw();

});