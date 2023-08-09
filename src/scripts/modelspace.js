// IMPORT FUNCTIONS
import { lineDrawMousedown, lineDrawMousemove } from './lineDraw.js';
import { selectionMousedown, selectionMousemove, selectionHover } from './selectShape.js';
import { gridDraw } from './gridDraw.js';
import { handleKeys, handleKeyUp } from './handleKeys.js';
import { zoomStage } from './zoomStage.js';
import { panStage } from './panStage.js';
import { snapDetect, snapAnchorScale } from './snapSystem.js';
import { initCanvasColors } from './uiColors.js'

// EXPORT GLOBAL OBJECTS
export var container = document.getElementById("modelspace-container");
export var selectionMode = true, lineMode = false, orthoMode = false, snapMode = true;
export var zoomStep = 0.1, isZoomin = false, scaleStage = 1, scaleGrid = 1;
export var isPanning = false, isDrawing = false;
export var snapState = { state: false, point: null };
export var gridShow = true, gridSize = 50;
export var oldPointerDrag = null;

window.addEventListener('resize', function () {
    updateStageSize(scaleStage, gridSize);
});

// EXECUTE COMANDS
export function executeCommand(command) {
    if (command === "Line") {
        selectionMode = false;
        lineMode = true;
        console.log("Linemode: ", lineMode)
    } else if (command === "Escape") {
        selectionMode = true;
        lineMode = false;
        isDrawing = false;
        console.log("Esc is pressed");
    } else if (command === "Ortho") {
        orthoMode = true;
        console.log("ORTHO ON");
    } else if (command === "Snap") {
        snapMode = false;
        console.log("SNAP OFF");
    }
}

// INITIALIZE UI COLORS
initCanvasColors()

// CREATE STAGES
const stage = new Konva.Stage({
    width: container.offsetWidth,
    height: container.offsetHeight,
    container: 'modelspace-container'
});
const gridStage = new Konva.Stage({
    offsetX: -container.offsetWidth / 2,
    offsetY: -container.offsetHeight / 2,
    width: container.offsetWidth,
    height: container.offsetHeight,
    container: 'grid-container'
});


// CREATE LAYERS
const defaultLayer = new Konva.Layer();
const gridLayer = new Konva.Layer();
gridLayer.opacity(0.5);
stage.add(defaultLayer);
gridStage.add(gridLayer);

// UPDATE STAGES
function updateStageSize(scaleStage, gridSize) {
    container = document.getElementById("modelspace-container");

    stage.width(container.offsetWidth,);
    stage.height(container.offsetHeight);
    stage.batchDraw();

    gridStage.width(container.offsetWidth,);
    gridStage.height(container.offsetHeight);
    gridStage.batchDraw();
    gridLayer.batchDraw();

    console.log("Stage origin: ", stage.width() / 2, ", ", stage.height() / 2)
    if (gridShow) { gridDraw(gridStage, gridLayer, gridSize, scaleStage); }
} updateStageSize(scaleStage, gridSize);

// HANDLE KEYPRESS
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        const modes = handleKeys(event, isDrawing);
    });
    document.addEventListener('keyup', function (event) {
        const modesRelease = handleKeyUp(event, orthoMode, snapMode)
        orthoMode = modesRelease.orthoMode;
        snapMode = modesRelease.snapMode;
    });
});

// HANDLE MOUSE EVENTS
stage.on('mousedown', function (event) {
    if (event.evt.button === 0) {
        // left mouse click
        // nothing fancy here, basta ihandle ang lineDraw kung line mode,
        // and handle ang selection kung naka selection mode 
        if (lineMode) {
            lineDrawMousedown(stage, defaultLayer, snapState.state, snapState.point, orthoMode);
            isDrawing = true;
        }
        if (selectionMode) {
            selectionMousedown(stage, defaultLayer);
        }
    }
    if (event.evt.button === 1) {
        // middle mouse click
        // basically, idi-disable lang ang default behavior ng middle click,
        // para ma-override and maactivate ang panning mode
        // oldPointerDrag is simply coordinates ng unang middle click   
        event.evt.preventDefault();
        isPanning = true;
        oldPointerDrag = stage.getRelativePointerPosition();
    }
});
stage.on('mousemove', function (event) {
    var pointer = stage.getRelativePointerPosition();

    if (lineMode) {
        // Store snap state if drawing
        // meaning, ire-read lang ang state ng snapping if
        // currently nagddraw ng line OR may lines nang nadraw
        // kung hindi, it means walang snapping
        if ((isDrawing || (defaultLayer.getChildren().length > 0)) && snapMode) {
            snapState = snapDetect(stage, defaultLayer, pointer, orthoMode, snapMode);
        }
        lineDrawMousemove(stage, scaleStage, defaultLayer, snapState.state, snapState.point, orthoMode);
    }
    if (selectionMode) {
        selectionMousemove(pointer);
        selectionHover(defaultLayer, pointer);
    }
    if (isPanning) {
        event.evt.preventDefault();
        panStage(stage, gridStage, oldPointerDrag);
    }
});
stage.on("wheel", function (event) {
    // Wheel zooming
    // pointer gets the pointer position then zoomInc determines
    // the direction of increment, wheter positive or negative
    event.evt.preventDefault();
    var pointer = stage.getPointerPosition();
    var zoomInc = event.evt.deltaY > 0 ? -zoomStep : zoomStep;
    isZoomin = (Math.sign(zoomInc) === 1) ? true : false;

    // Rescale stage, grid, and anchors
    scaleStage = zoomStage(stage, pointer, scaleStage, zoomInc);
    scaleGrid = zoomStage(gridStage, pointer, scaleGrid, zoomInc);
    snapAnchorScale(defaultLayer, scaleStage);

    gridSize = (scaleStage <= 0.5)? 100 : 50;
    gridSize = (scaleStage <= 0.25)? 100 : 50;

    updateStageSize(scaleStage, gridSize);
    defaultLayer.batchDraw();
    gridLayer.batchDraw();
});
stage.on('mouseup', function (event) {
    if (event.evt.button === 0) {
        // left mouse release
    }
    if (event.evt.button === 1) {
        // middle mouse click release
        isPanning = false;
        oldPointerDrag = 0;
    }
});

