
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");


    // vamos a tener 25 columnas que van a ir variando su alto de 20 en 20

    var x = canvas.width ;
    var y = canvas.height;

    var columns = [];

    var interval ;

    function initLoad(ArrayOfColumns) {
        for (let index = 1; index < 22; index++) {
            ArrayOfColumns.push(index * 20);
        }
    }

    //take the first element and move over the colums

    var step1 = 0;
    var step2 = 0;
    var drawer = new Drawer();
    function bubbleSort(){
        drawer.clearCanvas();
        drawer.draw(columns);

        drawer.drawColum(step1+1, columns[step1], "red");
        drawer.drawColum(step2+1, columns[step2], "gray");

        if ( columns[step1] < columns[step2] ){

            let v1 = columns[step1];
            columns[step1] = columns[step2];
            columns[step2] = v1;
        }

        if ( step2 <= 21){
            step2 ++;
        }else{
            step1++;
            step2 = 0;
        }

        if(step1 > 22){
            clearInterval(interval);
        }
    }

    /*
    
    public static List<Integer> mergeSort(List<Integer> list) {

        //condicion de corte
        if (list.size() == 1) {
            return list;
        }
        //indices
        int halfIndex = list.size() / 2;
        int endIndex = list.size();
        //list auxiliares
        List<Integer> part1 = new ArrayList<>();
        List<Integer> part2 = new ArrayList<>();
        //copia de las listas
        copyList(list, 0, halfIndex, part1);
        copyList(list, halfIndex, endIndex, part2);
        //fraccionamos la lista nuevamente
        mergeSort(part1);
        mergeSort(part2);
        //comienzo del sorting entre las sublistas
        sort(list, part1, part2);

        return list;
    }
    */

    /* clear the whole screen*/

    /**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    initLoad(columns);

    let a = shuffle(columns);
    columns = a;
    // draw(columns);
    
    interval = setInterval(bubbleSort, 9);

});




