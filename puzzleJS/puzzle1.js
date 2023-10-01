const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startingPosition = {
    x: 1,
    y: 307
};

let cursorPos = { ...startingPosition };

const bgImage = new Image();
bgImage.src = "assets/tester-puzzle.png";

const untouchableAreas = [
    [
        {x: 0, y: 568}, {x: 569, y: 566}, {x: 569, y: 502}, {x: 842, y: 500},
        {x: 1000, y: 168}, {x: 1587, y: 169}, {x: 1410, y: 419}, {x: 1916, y: 417},
        {x: 1919, y: 0}, {x: 0, y: -2}, {x: 0, y: 595}, {x: 0, y: 568}
    ],
    [
        {x: 0, y: 595}, {x: 595, y: 593}, {x: 596, y: 517}, {x: 834, y: 517},
        {x: 836, y: 748}, {x: 1378, y: 748}, {x: 1376, y: 559}, {x: 1168, y: 556},
        {x: 1171, y: 675}, {x: 1024, y: 671}, {x: 1024, y: 478}, {x: 1917, y: 478},
        {x: 1919, y: 917}, {x: 0, y: 914}
    ],
    [
        {x: 861, y: 512}, {x: 863, y: 736}, {x: 1342, y: 731}, {x: 1344, y: 580},
        {x: 1195, y: 580}, {x: 1193, y: 682}, {x: 1007, y: 685}, {x: 1002, y: 471},
        {x: 898, y: 434}, {x: 1019, y: 183}, {x: 1560, y: 181}, {x: 1387, y: 424},
        {x: 1388, y: 439}, {x: 1914, y: 439}, {x: 1912, y: 468}, {x: 1007, y: 469}
    ],
    [
        {x: 902, y: 427}, {x: 864, y: 514}, {x: 1003, y: 471}
    ]
];

function isPointInPath(point, path) {
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.closePath();
    return ctx.isPointInPath(point.x, point.y);
}

function drawCursor() {
    ctx.beginPath();
    ctx.arc(cursorPos.x, cursorPos.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    drawCursor();
}

bgImage.onload = drawGame;

canvas.addEventListener("mousemove", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    const point = { x: mouseX, y: mouseY };

    let isWithinUntouchableArea = false;
    for (const area of untouchableAreas) {
        if (isPointInPath(point, area)) {
            isWithinUntouchableArea = true;
            break;
        }
    }

    if (isWithinUntouchableArea) {
        cursorPos = { ...startingPosition };
        console.log("Went the wrong way on the subway!");
        drawGame();
        return;
    }

    cursorPos = point;
    drawGame();
});
