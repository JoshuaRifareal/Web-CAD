import { clearSelection, addSelectedObject } from './handleKeys.js';

let selectionRectangle;
let startPos;
var selectedObjects = [];     // Lines selected
var collisionHistory = [];    // Booleans
// Storing original props of unselected lines
var unselectedObjects = []
var unselected = {
  _id: null,
  stroke: null,
  strokeWidth: null, 
};       
var originalStroke = null;    // Stroke storage
var isUnselected = false;     // Original switch

export function selectionMousedown(stage, defaultLayer) {
  if (!selectionRectangle){
    startPos = stage.getRelativePointerPosition();
    selectionRectangle = new Konva.Rect({
      fill: 'rgba(60, 105, 255, 0.2)',
      stroke: 'blue', 
      strokeWidth: 1,
      visible: false,
      strokeScaleEnabled: false
    });

    selectionRectangle.position(startPos);
    selectionRectangle.visible(true);
    defaultLayer.add(selectionRectangle);
  } else {
    selectionRelease(defaultLayer)
  }
}

export function selectionMousemove(pointer) {
  if (!selectionRectangle) return;

  // Set Position of selection rectangle
  const x = Math.min(startPos.x, pointer.x);
  const y = Math.min(startPos.y, pointer.y);
  const width = Math.abs(pointer.x - startPos.x);
  const height = Math.abs(pointer.y - startPos.y);

  // Update the position and size
  selectionRectangle.position({ x, y });
  selectionRectangle.size({ width, height });
}

function selectionRelease(defaultLayer) {
  if (!selectionRectangle) return; // No active selection rectangle

  // Get the position and size of the selection rectangle
  const rectX = selectionRectangle.x();
  const rectY = selectionRectangle.y();
  const rectWidth = selectionRectangle.width();
  const rectHeight = selectionRectangle.height();

  // Iterate through all objects
  const objects = defaultLayer.getChildren();
  objects.forEach(function(object) {
    if (object instanceof Konva.Line) {
      const points = object.points();

      // Check for collision
      const collisionState = rectangleLineCollision(rectX, rectY, rectWidth, rectHeight, points);

      if (collisionState) {selectedObjects = addSelectedObject(object)};
      collisionHistory.push(collisionState);
    }
  });
  
  if (isCollided(collisionHistory)) {
    // Storing original props
    selectedObjects.forEach(function(object) {
      var unselected = {
        _id: object._id,
        stroke: object.stroke(),
        strokeWidth: object.strokeWidth(),
      };
      // Push if unique
      if (!unselectedObjects.some(obj => obj._id === unselected._id)) {
        unselectedObjects.push(unselected);
      }

      // Highlighting selected
      object.stroke('cyan');
    });

  } else {
    // Restoring original props
    selectedObjects.forEach(function(object) {
      unselectedObjects.forEach(function(unselect) {
        if (unselect._id === object._id) {
          console.log("Revert to ", unselect.stroke)
          object.stroke(unselect.stroke);
          object.strokeWidth(unselect.strokeWidth);
        }
      });
    });

    // Clear selected and unselected objects
    selectedObjects = clearSelection();
    unselectedObjects = [];
  }
  console.log("Selected ", selectedObjects.length, (selectedObjects.length>1) ? " lines" : " line");
  collisionHistory = [];

  // Hide and remove the selection rectangle
  selectionRectangle.visible(false);
  selectionRectangle.destroy();
  selectionRectangle = null;
}

export function selectionHover(defaultLayer, pointer) {
  // Iterate through all objects
  const objects = defaultLayer.getChildren();
  objects.forEach(function(object) {
    if (object instanceof Konva.Line) {
      const points = object.points();
      if (points.length == 4){
        if (pointLineCollision(pointer.x, pointer.y, points)) {
          // Collision detected, handle it here
          // console.log('Collided with: ', object);
          // object.stroke('red');
        } else {
          // object.stroke('black');
        }
      }
    }
  });
}

function pointLineCollision(x, y, linePoints) {
  const [x1, y1, x2, y2] = linePoints;
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Calculate the length squared of the line segment
  const lineLengthSquared = dx * dx + dy * dy;

  // If the line segment has zero length, there's no collision
  if (lineLengthSquared === 0) return false;

  // Calculate the parameterization value (t) of the closest point on the line
  const t = ((x - x1) * dx + (y - y1) * dy) / lineLengthSquared;

  // Check if the point is outside the line segment
  if (t < 0 || t > 1) return false;

  // Calculate the closest point on the line to the given point
  const closestX = x1 + t * dx;
  const closestY = y1 + t * dy;

  // Calculate the distance squared between the closest point and the given point
  const distanceSquared = (x - closestX) * (x - closestX) + (y - closestY) * (y - closestY);

  // Set a threshold for collision detection (adjust as needed)
  const thresholdSquared = 20;

  // If the distance squared is less than the threshold, there's a collision
  return distanceSquared <= thresholdSquared;
}

function rectangleLineCollision(rectX, rectY, rectWidth, rectHeight, linePoints) {
  // Rectangle boundaries
  const rectLeft = rectX;
  const rectRight = rectX + rectWidth;
  const rectTop = rectY;
  const rectBottom = rectY + rectHeight;

  // Line coordinates
  const x1 = linePoints[0];
  const y1 = linePoints[1];
  const x2 = linePoints[2];
  const y2 = linePoints[3];

  // Find the closest point on the line to the rectangle center
  const lineVecX = x2 - x1;
  const lineVecY = y2 - y1;
  const dx = rectX + rectWidth / 2 - x1;
  const dy = rectY + rectHeight / 2 - y1;
  const t = (dx * lineVecX + dy * lineVecY) / (lineVecX * lineVecX + lineVecY * lineVecY);

  let closestX, closestY;
  if (t <= 0) {
    closestX = x1;
    closestY = y1;
  } else if (t >= 1) {
    closestX = x2;
    closestY = y2;
  } else {
    closestX = x1 + t * lineVecX;
    closestY = y1 + t * lineVecY;
  }

  // Check if the closest point is within the rectangle boundaries
  if (closestX >= rectLeft && closestX <= rectRight && closestY >= rectTop && closestY <= rectBottom) {
    return true; // Collision detected
  } else {
    return false; // No collision
  }
}

function isCollided(array) {
  return array.some(element => element === true);
}