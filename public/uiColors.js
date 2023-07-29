export let mode = 'light';

export function initCanvasColors() {
    document.body.style.backgroundColor = uiColors(mode).bgcolor;
    console.log(mode.charAt(0).toUpperCase() + mode.slice(1), "mode enabled.");
}

export function uiColors(mode) {
    let bgcolor, gridColor, lineColor;

    if (mode === "light") {
        bgcolor = "white";
        gridColor = "black";
        lineColor = "black";
    } else if (mode === "dark") {
        bgcolor = "rgb(33, 40, 48)";
        gridColor = "lightgray";
        lineColor = "white";
    } else if (mode === "night") {
        bgcolor = "rgb(28, 10, 58)";
        gridColor = "gray";
        lineColor = "rgb(125, 83, 255)";
    } else {
        bgcolor = "purple";
    }

    // Return all variables
    return { bgcolor, gridColor, lineColor };
}