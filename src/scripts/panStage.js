export function panStage(stage, gridStage, oldPointerDrag) {
    // Calculate the delta movement of the pointer
    var pointerPosition = stage.getRelativePointerPosition();
    var scale = stage.scaleX();

    var dx = (pointerPosition.x - oldPointerDrag.x) * scale;
    var dy = (pointerPosition.y - oldPointerDrag.y) * scale;

    // Update the stage's position
    stage.position({
        x: stage.x() + dx,
        y: stage.y() + dy
    });
    gridStage.position({
        x: stage.x() + dx,
        y: stage.y() + dy
    });

    // Store the current pointer position for the next movement calculation
    oldPointerDrag = pointerPosition;
}
