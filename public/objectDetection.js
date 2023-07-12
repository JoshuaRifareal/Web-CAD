// NOT USED, FOR TESTING PURPOSES ONLY

var isDetecting = true;
var isDetected = false;
var isIndicated = false;

export function objectDetect(stage, defaultLayer) {
    if (isDetecting) {
    
    var pos = stage.getPointerPosition();
    var shapes = stage.find('.line'); // Get all the shapes on the stage

        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            var transform = shape.getAbsoluteTransform().copy(); // Get the absolute transform of the shape
            transform.invert(); // Invert the transform to map the mouse position to the shape's local coordinate system
            var localPos = transform.point(pos);

            var points = shape.getClientRect({
                skipTransform: true // Skip transformation when getting the client rectangle
            });

            if (!isIndicated) {
                var originalAttributes = shape.attrs;
            }

            if (!isDetected) {
                var temporaryAttributes = originalAttributes;

                // console.log("DETECTING...")
                if (
                    localPos.x >= points.x &&
                    localPos.x <= points.x + points.width &&
                    localPos.y >= points.y &&
                    localPos.y <= points.y + points.height
                    ) 
                    {
                    // console.log('Shape detected!');
                    shape.stroke('red');
                    shape.strokeWidth(3);
                    isDetected = true;
                    isIndicated = true;
                } else {
                    // console.log('Nothing detected!');
                    shape.stroke('black');
                    shape.strokeWidth(1);
                    isDetected = false;
                    isIndicated = false;
                }
            }
            isDetected = false;
        }
    }
    defaultLayer.batchDraw();
};

export function lineDetect(event, stage) {
    stage.on('contentMouseenter', function(event) {
        var shape = e.target;
        if (shape.getClassName() === 'Line') {
            console.log('Mouse entered a line shape');
        }
      });
      
    stage.on('contentMouseleave', function(event) {
        var shape = e.target;
        if (shape.getClassName() === 'Line') {
            console.log('Mouse left a line shape');
        }
    });
}
