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

export function translateStage(stage, gridStage, oldWindowSize) {
    // Calculate the delta in size
    var newWindowSize = { x: window.innerWidth, y: window.innerHeight }

    var dx = (newWindowSize.x - oldWindowSize.x);
    var dy = (newWindowSize.y - oldWindowSize.y);

    // Calculate the position change proportionally
    var scaleX = (stage.x() + stage.width() / 2) / oldWindowSize.x;
    var scaleY = (stage.y() + stage.height() / 2) / oldWindowSize.y;
    
    // Update the stage's position
    stage.position({
        x: (newWindowSize.x * scaleX) - stage.width() / 2,
        y: (newWindowSize.y * scaleY) - stage.height() / 2
    });
    gridStage.position({
        x: (newWindowSize.x * scaleX) - stage.width() / 2,
        y: (newWindowSize.y * scaleY) - stage.height() / 2
    });
}
