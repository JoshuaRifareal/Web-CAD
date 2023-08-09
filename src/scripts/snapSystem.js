import { mode, uiColors } from './uiColors.js';

var detectArea = 20; // Margin of error for Detection
const isCircle = false, isSquare = true;
var snapCircle = new Konva.Circle({
    id: 'snapAnchor',
    radius: 5,
    // fill: 'yellow',
    stroke: uiColors(mode).lineColor,
    strokeWidth: 1,
    perfectDrawEnabled: false,
    // strokeScaleEnabled: false
});
var snapSquare = new Konva.Rect({
    id: 'snapAnchor',
    width: 10,
    height: 10,
    // fill: 'yellow',
    stroke: uiColors(mode).lineColor,
    strokeWidth: 1,
    perfectDrawEnabled: false,
    // strokeScaleEnabled: false
})

export function snapDetect(stage, defaultLayer, pointer, orthoMode, snapMode) {
    // Get all the shapes on the stage
    var lineCollection = stage.find('.line'); 
    var snapPosition = {x: null, y: null};

    if (lineCollection.length > 0) {
        // Flag found state
        var foundShape = false; 

        // Iterate over line shapes in reverse order to prioritize the latest shapes
        for (var i = lineCollection.length - 2; i >= 0; i--) {
            var lineShape = lineCollection[i];

            var startX = lineShape.attrs.points[0];
            var startY = lineShape.attrs.points[1];
            var endX = lineShape.attrs.points[2];
            var endY = lineShape.attrs.points[3];

            // Check if the pointer is near the start point
            var nearStartPoint =
                (pointer.x >= (startX - detectArea) && pointer.x <= (startX + detectArea)) &&
                (pointer.y >= (startY - detectArea) && pointer.y <= (startY + detectArea));

            // Check if the pointer is near the endpoint only when lineMode is true
            var nearEndPoint = !orthoMode &&
                (pointer.x >= (endX - detectArea) && pointer.x <= (endX + detectArea)) &&
                (pointer.y >= (endY - detectArea) && pointer.y <= (endY + detectArea));

            if (nearStartPoint || nearEndPoint) {
                snapPosition.x = nearStartPoint ? startX : endX;
                snapPosition.y = nearStartPoint ? startY : endY;
                
                snapAnchor(defaultLayer, snapPosition.x, snapPosition.y);

                foundShape = true;
                return {state: true, point: snapPosition};
            }
        }

        if (!foundShape) { removeSnapAnchor(); }
        defaultLayer.batchDraw();
        return {state: false, point: null};
    }
}

export function snapAnchorScale(defaultLayer, scale) {
    var circleScale = 5 / scale;
    var squareScale = 10 / scale;
    var detectAreaScale = 20 / scale;

    detectArea = (Math.min(Math.max(detectAreaScale, 20), 100));
    snapCircle.radius(Math.min(Math.max(circleScale, 1.5), 25));
    snapSquare.width(Math.min(Math.max(squareScale, 5), 40));
    snapSquare.height(Math.min(Math.max(squareScale, 5), 40));

    defaultLayer.batchDraw();
}

function snapAnchor(defaultLayer, moveToX, moveToY){
    if (isCircle) {
        snapCircle.position({ x: moveToX, y: moveToY });
        snapCircle.moveToTop();
        defaultLayer.add(snapCircle);
    }
    if (isSquare) {
        snapSquare.x(moveToX-(snapSquare.width()/2)); 
        snapSquare.y(moveToY-(snapSquare.height()/2));
        snapSquare.moveToTop();
        defaultLayer.add(snapSquare);
    }
    defaultLayer.batchDraw();
}

export function removeSnapAnchor(){
    snapCircle.remove();
    snapSquare.remove();
}