import { removeSnapAnchor } from './snapSystem.js'
import { revertHightlight } from './selectShape.js'
import { command, ActivateTool } from '../comps/CommandBar.jsx';
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
    ActivateTool(command);
    console.log("Enter is pressed")
  } else if (event.key === 'Control') {
    // Enter command
    executeCommand("Snap");
  } else {
    return;
  }

  return { isDrawing }
}

export function handleKeyUp(event, orthoMode, snapMode) {
  if (event.key === 'Shift') {
    // Ortho mode OFF
    orthoMode = false;
    console.log("ORTHO OFF");
  } else if (event.key === "Control") {
    snapMode = true;
    console.log("SNAP ON");
  }

  return { orthoMode, snapMode };
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