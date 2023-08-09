export let mode = 'light';

export function initCanvasColors() {
    document.body.style.backgroundColor = uiColors(mode).bgcolor;
    console.log(mode.charAt(0).toUpperCase() + mode.slice(1), "mode enabled.");
}

export function uiColors(mode) {
    let bgcolor, gridColor, lineColor, highlightColor;

    if (mode === "light") {
        bgcolor = "white";
        gridColor = "gray";
        lineColor = "black";
        highlightColor = "rgb(252, 0, 252)"
    } else if (mode === "autocad") {
        bgcolor = "rgb(33, 40, 48)";
        gridColor = "lightgray";
        lineColor = "white";
        highlightColor = "cyan"
    } else if (mode === "dark") {
        bgcolor = "black";
        gridColor = "gray";
        lineColor = "rgb(125, 83, 255)";
        highlightColor = "yellow"
    } else if (mode === "night") {
        bgcolor = "rgb(28, 10, 58)";
        gridColor = "gray";
        lineColor = "rgb(125, 83, 255)";
        highlightColor = "yellow"
    } else {
        bgcolor = "purple";
    }

    // Return all variables
    return { bgcolor, gridColor, lineColor, highlightColor };
}