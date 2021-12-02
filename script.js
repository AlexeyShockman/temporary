document.addEventListener("DOMContentLoaded", main);

const sideSize = 16;
const animDelayStep = 5;  //ms
const arrOfClassNames = ['slide-SIDE-', 'perspective-SIDE-', 'rotate-SIDE-', 'tin-SIDE-Out', 'tin-SIDE-Out', 'tin-SIDE-Out', 'tin-SIDE-Out', 'tin-SIDE-Out'];
const arrOfCornerClassNames = ['open-SIDE2--SIDE1-', 'open-SIDE2--SIDE1-', 'bomb-SIDE1-Out', 'bomb-SIDE1-Out', 'bomb-SIDE1-Out', 'holeOut', 'holeOut', 'holeOut' ];
//let step = 0; на основе этого параметра будут вычисляться координаты сторон. Условно говоря, это какой ряд от края мы рассматриваем.
let topRow, rightRow, botRow, leftRow, reverseLeftRow, reverseBotRow;
let animDelay = 0;


function getRows(step) {
    let arr = [];
    for (let i = 1 + ((sideSize + 1) * (step)); i <= sideSize + (sideSize - 1) * step; i++) {
        arr.push(i);
    }

    topRow = [...arr];
    rightRow = topRow.map(i => sideSize * (i-sideSize*step)-step);
    botRow = topRow.map(i => i+sideSize*sideSize - sideSize*(step*2+1));
    leftRow = topRow.map(i => i + (sideSize-1) * ((i - sideSize * step - step) - 1));
    reverseLeftRow = [...leftRow].reverse();
    reverseBotRow = [...botRow].reverse();
    rightRow.slice(step, -step)
}
function doStyle(arrOfRows, $arrOfCubes, className='vanishOut', direction = 'Right') {
    arrOfRows.forEach(function (i) {
        let el = $arrOfCubes[i-1];
        let sideClassName = className.replace('-SIDE-', direction)
        el.style.animationDelay = `${animDelay+ getRandomInt(0, 400)}ms`;
        animDelay += animDelayStep;
        el.classList.add('magictime', sideClassName);
    })
    animDelay += 150;
}

function doCornerStyle(cornerEl, $arrOfCubes, className, direction){
    let el = $arrOfCubes[cornerEl-1]
    let cornerClassName = className.replace('-SIDE1-', direction[0]).replace('-SIDE2-', direction[1]);
    el.style.animationDelay = `${animDelay+ getRandomInt(0, 400)}ms`;
    el.classList.add('magictime', cornerClassName);
    animDelay += 75;
}



function animateAll() {
    let $q = document.querySelectorAll('.smallCube');
    for (let i = 0; i < sideSize/2; i++) {
        getRows(i);
        doStyle(topRow.slice(1,-1), $q, arrOfClassNames[i], 'Up');
        doStyle(rightRow.slice(1,-1), $q, arrOfClassNames[i], 'Right');
        doStyle(reverseBotRow.slice(1,-1), $q, arrOfClassNames[i], 'Down');
        doStyle(reverseLeftRow.slice(1,-1), $q, arrOfClassNames[i], 'Left');
        doCornerStyle(topRow[0], $q, arrOfCornerClassNames[i], ['Left', 'Up']);
        doCornerStyle(rightRow[0], $q, arrOfCornerClassNames[i],['Right', 'Up']);
        doCornerStyle(reverseBotRow[0],$q, arrOfCornerClassNames[i],['Right', 'Down']);
        doCornerStyle(reverseLeftRow[0], $q, arrOfCornerClassNames[i], ['Left', 'Down']);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function main() {
    let $container = document.querySelector('.container');
    resize()

    function resize() {
        if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
            $container.style.height = '80vw';
            $container.style.width = '80vw';
        } else {
            $container.style.height = '80vh';
            $container.style.width = '80vh';
        }
    }


    setTimeout(animateAll, 500);
    window.addEventListener(`resize`, event => {
        resize()
    }, false);
}


