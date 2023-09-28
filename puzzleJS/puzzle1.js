let onPath = false;

document.querySelector("#street").addEventListener("mousemove", function(event) {
    let pathElement = document.querySelector(".path");
    let isOverPath = event.target === pathElement;
    if (!isOverPath && onPath) {
        console.log("Strayed off the path!");
    }
    onPath = isOverPath;
});
