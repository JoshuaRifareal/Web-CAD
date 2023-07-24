let line = null, isLineInit = false;
var prevEndpoint = {x:null, y:null};
var isDrawing = false, isSnapped = false;
var orthoIndicator = new Konva.Line({
    stroke: 'green',
    strokeWidth: 1,
    name: "orthoIndicator",
    dash: [5, 5],
    strokeScaleEnabled: false
});

export function lineDrawMousedown(stage, defaultLayer, snapState, snapPoint, orthoMode) {
    var startPoint = stage.getRelativePointerPosition();
    isDrawing = true;

    line = new Konva.Line({
        stroke: 'white',
        strokeWidth: 2,
        name: "line"
    });
    
    if (!orthoMode) {
        line.points([startPoint.x, startPoint.y, startPoint.x, startPoint.y]);

    } else {
        // IF ORTHO, LOCK ON TO PREVIOUS
        line.points([prevEndpoint.x, prevEndpoint.y, prevEndpoint.x, prevEndpoint.y]);
    }
    if (isSnapped) {
        // IF SNAPPED, START FROM PREVIOUS
        line.points([prevEndpoint.x, prevEndpoint.y, prevEndpoint.x, prevEndpoint.y]);
    }
    if (snapState) {
        // IF DETECT, START FROM POINT
        line.points([snapPoint.x, snapPoint.y, snapPoint.x, snapPoint.y]);
    }

    defaultLayer.add(line);
    defaultLayer.batchDraw();

    if (!isLineInit) {
        // Line initialized, start storing points
        isLineInit = true;
    }
}

export function lineDrawMousemove(stage, scaleStage, defaultLayer, snapState, snapPoint, orthoMode) {
    if (line) {
        isDrawing = true;
        var currentPosition = stage.getRelativePointerPosition();
        var endPoint = line.points();

        if (!orthoMode) {
            endPoint[2] = currentPosition.x;
            endPoint[3] = currentPosition.y;
            orthoIndicator.remove();
        } else {
            // IF ORTHO, LOCK ON TO NEAREST AXIS
            if (Math.abs(currentPosition.x - endPoint[0]) < Math.abs(currentPosition.y - endPoint[1])) {
                endPoint[2] = endPoint[0];
                endPoint[3] = currentPosition.y;
                prevEndpoint = {x:endPoint[2], y:endPoint[3]}

                orthoIndicator.points([endPoint[2], -stage.height()/scaleStage*2, endPoint[2], stage.height()/scaleStage*2]);
                orthoIndicator.moveToBottom();
                defaultLayer.add(orthoIndicator);
                defaultLayer.batchDraw();
            } else {
                endPoint[2] = currentPosition.x;
                endPoint[3] = endPoint[1];
                prevEndpoint = {x:endPoint[2], y:endPoint[3]}

                orthoIndicator.points([-stage.width()/scaleStage*2, endPoint[3], stage.width()/scaleStage*2, endPoint[3]]);
                orthoIndicator.moveToBottom();
                defaultLayer.add(orthoIndicator);
                defaultLayer.batchDraw();
            }
        }

        if (snapState && snapPoint != null) {
            // IF NEAR SNAP, SET ENDPOINT
            endPoint[2] = snapPoint.x;
            endPoint[3] = snapPoint.y;
            isSnapped = true;
            prevEndpoint = {x:endPoint[2], y:endPoint[3]}
        } else { 
            isSnapped = false; 
        }

        line.points(endPoint);
        defaultLayer.batchDraw();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape' && isDrawing) {
        // Cancel active line
        line.remove();
        line = null;
        isLineInit = false;
        isDrawing = false;
    }
});