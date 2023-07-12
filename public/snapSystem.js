var detectArea = 20; // Margin of error for Detection
var circle = new Konva.Circle({
    id: 'snapIndicator',
    radius: 5,
    fill: 'yellow',
    stroke: 'red',
    strokeWidth: 1,
    perfectDrawEnabled: false,
    strokeScaleEnabled: false
});

export function snapDetect(stage, defaultLayer, pointer, isDrawing, orthoMode) {
    var lineCollection = stage.find('.line'); // Get all the shapes on the stage

    if (lineCollection.length > 0) {
        var foundShape = false; // Flag to track if a suitable line shape is found

        // Iterate over line shapes in reverse order to prioritize the latest shapes
        for (var i = lineCollection.length - 1; i >= 0; i--) {
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
            var nearEndPoint = !isDrawing && !orthoMode &&
                (pointer.x >= (endX - detectArea) && pointer.x <= (endX + detectArea)) &&
                (pointer.y >= (endY - detectArea) && pointer.y <= (endY + detectArea));

            if (nearStartPoint || nearEndPoint) {
                circle.position({
                    x: nearStartPoint ? startX : endX,
                    y: nearStartPoint ? startY : endY
                });
                
                circle.moveToTop();

                defaultLayer.add(circle);
                defaultLayer.batchDraw();

                foundShape = true;
                return {state: true, point: circle.position()};
            }
        }

        if (!foundShape) {
            circle.remove();
            defaultLayer.batchDraw();
            return {state: false, point: null};
        }
    }
}

export function snapIndicatorScale(scale) {
    var circleScale = 5 / scale;
    var detectAreaScale = 20 / scale;

    detectArea = (Math.min(Math.max(detectAreaScale, 20), 100));
    circle.radius(Math.min(Math.max(circleScale, 1.5), 25));
}
