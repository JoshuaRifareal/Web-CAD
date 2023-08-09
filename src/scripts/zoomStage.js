export function zoomStage(stage, zoomPoint, zoomBefore, increment) {
  // remember the scale before new zoom is applied - we are scaling 
  // same in x & y so either will work
  let oldScale = stage.scaleX();

  // compute the distance to the zoom point before applying zoom
  var mousePointTo = {
    x: (zoomPoint.x - stage.x()) / oldScale,
    y: (zoomPoint.y - stage.y()) / oldScale
  };

  // compute new scale
  var zoomAfter = zoomBefore + increment;
  zoomAfter = Math.max(0.1, Math.min(5, zoomAfter))

  // apply new zoom to stage
  stage.scale({ x: zoomAfter, y: zoomAfter });

  // Important: move the stage so that the zoomed point remains 
  // visually in place
  var newPos = {
    x: zoomPoint.x - mousePointTo.x * zoomAfter,
    y: zoomPoint.y - mousePointTo.y * zoomAfter
  };

  // Apply position to stage
  stage.position(newPos);


  // return the new zoom factor.
  return zoomAfter;
}
  