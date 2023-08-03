import { removeSnapAnchor } from './snapSystem.js'
import { revertHightlight } from './selectShape.js'

let selectedObjects = [];

export function handleKeys(event, selectionMode, lineMode, isDrawing, orthoMode) {
    if (event.key === 'Escape') {
      // Deactivate Line tool
      selectionMode = true;
      lineMode = false;
      isDrawing = false;
      clearSelection();
      removeSnapAnchor();
      revertHightlight();
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


// Handle Select and Deselect
export function clearSelection() {
  selectedObjects = [];
  return selectedObjects;
}
export function addSelectedObject(object) {
  // Check if already exists
  if (!selectedObjects.some((item) => JSON.stringify(item) === JSON.stringify(object))) {
    selectedObjects.push(object);
  }
  return selectedObjects;
} 