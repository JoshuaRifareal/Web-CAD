import { lineDrawMousedown, lineDrawMousemove } from './lineDraw.js';
import { selectionMousedown, selectionMousemove, selectionHover } from './selectShape.js';
import { gridDraw } from './gridDraw.js';
import { handleKeys, handleKeyUp } from './handleKeys.js';
import { zoomStage } from './zoomStage.js';
import { panStage } from './panStage.js';
import { snapDetect, snapAnchorScale } from './snapSystem.js';
import { initCanvasColors } from './uiColors.js'

import { returnCommand } from '../comps/CommandBar.jsx';

var container = document.getElementById("modelspace-container");
var selectionMode = true, lineMode = false, orthoMode = false;
var isPanning = false, isDrawing = false;
var snapState = {state: false, point: null};
var zoomStep = 0.1, isZoomin = false, scaleStage = 1, scaleGrid = 1;
var gridShow = true, gridSize = 100;
var oldPointerDrag = null;

window.addEventListener('resize', function() {
    updateStageSize();
});

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
function updateStageSize(scaleStage) {
    container = document.getElementById("modelspace-container");
    
    stage.width(container.offsetWidth,);
    stage.height(container.offsetHeight);
    stage.batchDraw();

    gridStage.width(container.offsetWidth,);
    gridStage.height(container.offsetHeight);
    gridStage.batchDraw();
    gridLayer.batchDraw();

    console.log("Stage origin: ", stage.width()/2, ", ", stage.height()/2)
    if (gridShow) { gridDraw(gridStage, gridLayer, gridSize, scaleStage); }
} updateStageSize(scaleStage);

// HANDLE KEYPRESS
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        const modes = handleKeys(event, selectionMode, lineMode, isDrawing, orthoMode);
        selectionMode = modes.selectionMode;
        isDrawing = modes.isDrawing;
        orthoMode = modes.orthoMode;

        const tool = returnCommand();
        selectionMode = tool.selectionMode;
        lineMode = tool.lineMode;
    });
    document.addEventListener('keyup', function(event) {
        const modesRelease = handleKeyUp(event, orthoMode)
        orthoMode = modesRelease.orthoMode;
    });
});

// HANDLE MOUSE EVENTS
stage.on('mousedown', function(event) {
    if (event.evt.button === 0) {
        // left mouse click
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
        event.evt.preventDefault();
        isPanning = true;
        oldPointerDrag = stage.getRelativePointerPosition();
    }
});
stage.on('mousemove', function(event) {
    var pointer = stage.getRelativePointerPosition();

    if (lineMode) { 
        // Store snap state if drawing
        if (isDrawing || (defaultLayer.getChildren().length > 0)){ 
            snapState = snapDetect(stage, defaultLayer, pointer, isDrawing, orthoMode);
        } else { 
            snapDetect(stage, defaultLayer, pointer, isDrawing, orthoMode);
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
stage.on("wheel", function (e) {
    // Wheel zooming
    e.evt.preventDefault();
    var pointer = stage.getPointerPosition();
    var zoomInc = e.evt.deltaY > 0 ? -zoomStep : zoomStep;
    isZoomin = (Math.sign(zoomInc) === 1) ? true : false;

    // Rescale stage, grid, and anchors
    scaleStage = zoomStage(stage, pointer, scaleStage, zoomInc);
    scaleGrid = zoomStage(gridStage, pointer, scaleGrid, zoomInc);
    snapAnchorScale(defaultLayer, scaleStage);

    updateStageSize(scaleStage);
    defaultLayer.batchDraw();
    gridLayer.batchDraw();
});
stage.on('mouseup', function (e) {
    if (e.evt.button === 0) {
        // left mouse release
    }
    if (e.evt.button === 1) {
      // middle mouse click release
      isPanning = false;
      oldPointerDrag = 0;
    }
});
