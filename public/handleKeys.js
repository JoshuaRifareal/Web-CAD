let selectedObjects = [];

export function handleKeys(event, selectionMode, lineMode, isDrawing, orthoMode) {
    if (event.key === 'Escape') {
      // Deactivate Line tool
      selectionMode = true;
      lineMode = false;
      isDrawing = false;
      clearSelection();
      console.log("Esc is pressed");
    }
    if (event.key === 'Shift' && isDrawing) {
      // Ortho mode ON
      orthoMode = true;
      isDrawing = true;
      console.log("ORTHO ON");
    }
    if (event.key === 'l') {
      // Activate Line tool
      selectionMode = false;
      lineMode = true;
      console.log("L is pressed");
    }
    
    return { selectionMode, lineMode, isDrawing, orthoMode };
}

export function handleKeyUp(event, orthoMode) {
  if (event.key === 'Shift') {
      // Ortho mode OFF
      orthoMode = false;
      console.log("ORTHO OFF");
  }
  return { orthoMode };
}

export function clearSelection() {
  selectedObjects.forEach(function(object) {
    object.stroke('white');
  });
  selectedObjects = [];
}

export function addSelectedObject(object) {
  selectedObjects.push(object);
}