export function handleKeys(event, detectMode, lineMode, isDrawing, orthoMode) {
    if (event.key === 'Escape' && !isDrawing) {
      // Deactivate Line tool
      detectMode = true;
      lineMode = false;
      isDrawing = false;
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
      detectMode = false;
      lineMode = true;
      console.log("L is pressed");
    }
    
    return { detectMode, lineMode, isDrawing, orthoMode};
}

export function handleKeyUp(event, orthoMode) {
  if (event.key === 'Shift') {
      // Ortho mode OFF
      orthoMode = false;
      console.log("ORTHO OFF");
  }
  return { orthoMode };
}