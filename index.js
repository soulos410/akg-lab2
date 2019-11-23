let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.strokeStyle = '#000';

let currentPolygon = [[20, 140], [70, 75], [120, 10], [170, 75], [220, 140], [120, 140]];
const resultPolygon = [[1550, 920], [1650, 1000], [1750, 1000], [1850, 920], [1750, 840], [1650, 840]];
const centerPolygon = [[870, 560], [920, 495], [970, 430], [1020, 495], [1070, 560], [970, 560]];
const sixStarsFigureBig =
    [[550, 250], [800, 250], [930, 70],
    [1060, 250], [1310, 250], [1185, 450],
    [1310, 650], [1060, 650], [930, 830],
    [800, 650], [550, 650], [675, 450]];
const sixStarsFigureSmall = [[800, 400], [870, 400], [930, 310], [990, 400], [1060, 400], [1030, 450], [1060, 500], [990, 500], [930, 590], [870, 500], [800, 500], [835, 450]];
let differencesBetweenFigures = [[], [], [], [], [], []];
const separatorCoords = [[930, 0], [930, 1000]];
const maxSteps = 160;

function calculateDifferences(figureToCalculate) {
    figureToCalculate.forEach((el, index) => {
        differencesBetweenFigures[index].push((el[0] - currentPolygon[index][0]) / (maxSteps / 2));
        differencesBetweenFigures[index].push((el[1] - currentPolygon[index][1]) / (maxSteps / 2));
    });
}

function createSeparator(separator) {
    ctx.lineWidth = 2;
    ctx.beginPath();
    separator.forEach((el, index) => {
        index === 0 ? ctx.moveTo(el[0], el[1]) : ctx.lineTo(el[0], el[1]);
    });
    ctx.closePath();       // Рисует линию к нижнему левому углу
    ctx.stroke();
    ctx.lineWidth = 1;
}

function createSixStarsFigure(coords, isBigFigure) {
    if (isBigFigure) {
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        coords.forEach((el, index) => {
            index === 0 ? ctx.moveTo(el[0], el[1]) : ctx.lineTo(el[0], el[1]);
        });
        ctx.closePath();       // Рисует линию к нижнему левому углу
        ctx.clip();
        ctx.stroke();
        ctx.fill();
    }
    else {
        ctx.fillStyle = '#000';
        ctx.beginPath();
        coords.forEach((el, index) => {
            index === 0 ? ctx.moveTo(el[0], el[1]) : ctx.lineTo(el[0], el[1]);
        });
        ctx.closePath();       // Рисует линию к нижнему левому углу
        ctx.fill();
    }
}

function setBlackBackground() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createPolygon(coords) {
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    coords.forEach((el, index) => {
        index === 0 ? ctx.moveTo(el[0], el[1]) : ctx.lineTo(el[0], el[1]);
    });
    ctx.closePath();       // Рисует линию к нижнему левому углу
    ctx.fill();
}

function updatePolygonCoords() {
    currentPolygon.forEach((el, index) => {
        el[0] += differencesBetweenFigures[index][0];
        el[1] += differencesBetweenFigures[index][1];
    });
}



function start() {
    return new Promise(res => {
        let currentSteps = 0;
        const startAnimation = setInterval(() => {
            if (currentSteps < maxSteps / 2) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setBlackBackground();
                createSixStarsFigure(sixStarsFigureBig, true);
                updatePolygonCoords();
                createPolygon(currentPolygon);
                createSixStarsFigure(sixStarsFigureSmall, false);
                currentSteps++;
            }
            else {
                differencesBetweenFigures = [[], [], [], [], [], []];
                clearInterval(startAnimation);
                res();
            }
        }, 16);
    });
};

calculateDifferences(centerPolygon);
start().then(() => {
    calculateDifferences(resultPolygon);
    start();
});

// createSeparator(separatorCoords);


// ctx.fillStyle = '#000';
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// createSixStarsFigure(sixStarsFigureBig, true);
// ctx.clip();
// ctx.fillStyle = '#fff';
// ctx.strokeStyle = '#000';
// ctx.stroke();
// ctx.fill();
// ctx.fillStyle = '#000';
// createSixStarsFigure(sixStarsFigureSmall, false);
// ctx.fill();