export let mode = 'dark';

export function initCanvasColors() {
    document.body.style.backgroundColor = uiColors(mode).bgcolor;
    console.log(uiColors(mode));
}

export function uiColors(mode) {
    let bgcolor, gridColor;

    if (mode === "light") {
        bgcolor = "white";
        gridColor = "black";
    } else if (mode === "dark") {
        bgcolor = "rgb(33, 40,48)";
        gridColor = "lightgray";
    } else {
        bgcolor = "purple";
    }

    // Return all variables
    return { bgcolor, gridColor };
}