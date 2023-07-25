import { mode, uiColors } from './uiColors.js';

var gridColor = uiColors(mode).gridColor; // Color of the grid lines
var gridWidth = 0.2;

export function gridDraw(gridStage, gridLayer, gridSize, scaleStage) {
  // Clear the layer 
  gridLayer.destroyChildren();
  
  // Number of rows and columns
  var numCols = Math.ceil((gridStage.width()/scaleStage) / gridSize);
  var numRows = Math.ceil((gridStage.height()/scaleStage) / gridSize);

  // Draw vertical grid lines towards the right
  for (var col = 0; col <= numCols * 2; col++) {
    var x = col * gridSize;
    var vertDown = new Konva.Line({
      x: -(numCols * gridSize),
      points: [x, -(numRows * gridSize), x, (numRows * gridSize)],
      stroke: gridColor,
      strokeWidth: gridWidth,
      strokeScaleEnabled: false
    }); gridLayer.add(vertDown);
  }

  // Draw horizontal grid lines
  for (var row = 0; row <= numRows * 2; row++) {
    var y = row * gridSize;
    var horiRight = new Konva.Line({
      y: -(numRows * gridSize),
      points: [-(numCols * gridSize), y, (numCols * gridSize), y],
      stroke: gridColor,
      strokeWidth: gridWidth,
      strokeScaleEnabled: false,
    }); gridLayer.add(horiRight);
  }

  var originY = new Konva.Line({
    y: -(numRows * gridSize),
    points: [0, 0, 0, (numRows * gridSize)*2],
    stroke: 'green',
    strokeWidth: 1,
    strokeScaleEnabled: false
  }); gridLayer.add(originY);
  var originX = new Konva.Line({
    x: -(numCols * gridSize),
    points: [0, 0, (numCols * gridSize)*2, 0],
    stroke: 'red',
    strokeWidth: 1,
    strokeScaleEnabled: false
  }); gridLayer.add(originX);

  var originIndicator = new Konva.Circle({
    x: 0, y: 0,
    radius: 10,
    stroke: 'black',
    strokeWidth: 1,
  }); // gridLayer.add(originIndicator);

  // Batch draw all grid elements
  gridLayer.batchDraw();
}