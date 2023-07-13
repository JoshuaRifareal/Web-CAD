let selectionRectangle;
let startPos, endPos;

export function selectionMousedown(stage, defaultLayer) {
  if (!selectionRectangle){
    startPos = stage.getRelativePointerPosition();
    selectionRectangle = new Konva.Rect({
      fill: 'rgba(0, 0, 255, 0.2)',
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

export function selectionMousemove(stage) {
  if (!selectionRectangle) return;
  endPos = stage.getRelativePointerPosition();

  // Set Position of selection rectangle
  const x = Math.min(startPos.x, endPos.x);
  const y = Math.min(startPos.y, endPos.y);
  const width = Math.abs(endPos.x - startPos.x);
  const height = Math.abs(endPos.y - startPos.y);

  // Update the position and size
  selectionRectangle.position({ x, y });
  selectionRectangle.size({ width, height });
}

function selectionRelease(defaultLayer) {
  if (!selectionRectangle) return; // No active selection rectangle

  const selectedObjects = [];

  // Get the position and size of the selection rectangle
  const rectX = selectionRectangle.x();
  const rectY = selectionRectangle.y();
  const rectWidth = selectionRectangle.width();
  const rectHeight = selectionRectangle.height();

  // Iterate through all objects and check if any part of the line intersects with the selection rectangle
  const objects = defaultLayer.getChildren();
  objects.forEach(function(object) {
    if (object instanceof Konva.Line) {
      const points = object.points();

      // Check if any part of the line intersects with the selection rectangle
      let intersects = false;
      for (let i = 0; i < points.length - 2; i += 2) {
        const startX = points[i];
        const startY = points[i + 1];
        const endX = points[i + 2];
        const endY = points[i + 3];

        // Check for intersection between the line and the selection rectangle
        if (Konva.Util.haveIntersection(
          { x: rectX, y: rectY, width: rectWidth, height: rectHeight },
          { x: startX, y: startY, width: Math.abs(endX - startX), height: Math.abs(endY - startY) }
        )) {
          intersects = true;
          break;
        }
      }

      if (intersects) {
        selectedObjects.push(object);

        // Visual feedback (e.g., highlighting the selected object)
        object.stroke('red');
      }
    }
  });

  // Hide and remove the selection rectangle
  selectionRectangle.visible(false);
  selectionRectangle.destroy();
  selectionRectangle = null;
}
