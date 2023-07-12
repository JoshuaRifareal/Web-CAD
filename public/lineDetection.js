export function lineDetectionHandler (stage) {
    stage.on('contentMouseenter', function (e) {
        var shape = e.target;
        if (shape.getClassName() === 'Line') {
            console.log('Mouse entered a line shape');
        }
      });
      
    stage.on('contentMouseleave', function (e) {
        var shape = e.target;
        if (shape.getClassName() === 'Line') {
            console.log('Mouse left a line shape');
        }
    });
}
