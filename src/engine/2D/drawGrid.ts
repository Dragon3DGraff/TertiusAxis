export function drawGrid(ctx:CanvasRenderingContext2D, scale:number, gridSize:{ width: number, height: number }, step:number = 100) {
  // let offscreenCanvas = document.createElement("canvas");
  // offscreenCanvas.width = gridSize.width;
  // offscreenCanvas.height = gridSize.height;
//   const ctx = mainCtx; // offscreenCanvas.getContext("2d");
  ctx.save();

  const verticalLinesCount = gridSize.height / step;
  const horizontalLinesCount = gridSize.width / step;
  //   drawRect(ctx, { x: 0, y: 0 }, gridSize);
  ctx.strokeStyle = "lightgrey";
  ctx.lineWidth = 1 / scale;
  for (let i = 0; i < verticalLinesCount; i++) {
    //  ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.moveTo(0, i * step);
    ctx.lineTo(gridSize.width, i * step);
    ctx.stroke();
  }
  for (let j = 0; j < horizontalLinesCount; j++) {
    ctx.beginPath();
    ctx.moveTo(j * step, 0);
    ctx.lineTo(j * step, gridSize.height);

    ctx.stroke();
  }
//   drawText(
//     ctx,
//     `${0}`,
//     new Point(0, 12),
//     "green",
//     12 // scale
//   );
//   for (let k = 1; k < horizontalLinesCount; k++) {
//     drawText(
//       ctx,
//       `${k * step}`,
//       new Point(k * step, 12),
//       "green",
//       12 // scale
//     );
//   }
//   for (let l = 1; l < verticalLinesCount; l++) {
//     drawText(
//       ctx,
//       `${l * step}`,
//       new Point(0 * step, l * step + 12),
//       "green",
//       12 // scale
//     );
//   }
  // mainCtx.save();
  // mainCtx.scale(scale, scale);
  // mainCtx.drawImage(offscreenCanvas, 0, 0);
  // mainCtx.restore();
  // offscreenCanvas = null;
  ctx.restore();
}
