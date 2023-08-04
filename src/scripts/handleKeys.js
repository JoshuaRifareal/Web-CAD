import { removeSnapAnchor } from './snapSystem.js'
import { revertHightlight } from './selectShape.js'
import { command } from '../comps/CommandBar.jsx';
import { executeCommand } from './modelspace.js';

let selectedObjects = [];

export function handleKeys(event, isDrawing) {
  if (event.key === 'Escape') {
    // Deactivate Line tool
    executeCommand("Escape");
    clearSelection();
    removeSnapAnchor();
    revertHightlight();
  } else if (event.key === 'Shift' && isDrawing) {
    // Ortho mode ON
    executeCommand("Ortho");
  } else if (event.key === 'Enter') {
    // Enter command
    executeCommand(command);
    console.log("Enter is pressed")
  } else {
    return;
  }

  return { isDrawing }
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