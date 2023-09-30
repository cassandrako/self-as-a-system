const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startingPosition = {
    x: 1,  
    y: 307,  
};

let cursorPos = { ...startingPosition };

const bgImage = new Image();
bgImage.src = "assets/tester-puzzle.png";

const untouchableAreas = [
    [
        {x: 0, y: 571}, {x: 568, y: 566}, {x: 568, y: 502}, {x: 842, y: 500},
        {x: 1002, y: 169}, {x: 1585, y: 168}, {x: 1412, y: 419}, {x: 1912, y: 420},
        {x: 1912, y: 437}, {x: 1392, y: 439}, {x: 1387, y: 429}, {x: 1561, y: 181},
        {x: 1022, y: 179}, {x: 861, y: 509}, {x: 595, y: 510}, {x: 596, y: 595},
        {x: 0, y: 597}
    ],
    [
        {x: 837, y: 509}, {x: 836, y: 746}, {x: 1376, y: 751}, {x: 1376, y: 561},
        {x: 1170, y: 561}, {x: 1168, y: 670}, {x: 1022, y: 668}, {x: 1022, y: 478},
        {x: 1916, y: 476}, {x: 1914, y: 463}, {x: 997, y: 464}, {x: 1002, y: 683},
        {x: 1193, y: 680}, {x: 1193, y: 576}, {x: 1342, y: 580}, {x: 1341, y: 736},
        {x: 863, y: 732}, {x: 863, y: 507}
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

    for (const area of untouchableAreas) {
        if (isPointInPath(point, area)) {
            cursorPos = { ...startingPosition };
            console.log("Went the wrong way on the subway!");
            drawGame();
            return;
        }
    }

    cursorPos = point;  
    drawGame();
});
