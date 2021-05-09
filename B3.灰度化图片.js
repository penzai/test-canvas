import {loadImage, getImageData, traverse} from './common/lib/utils.js'

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

(async () => {
  const img = await loadImage("./img/1.jpg");
  const width = 64 * 5;
  const height = 96 * 5;

  const imageData = getImageData(img, width, height);
  traverse(imageData, ({ r, g, b, a }) => {
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return [v, v, v, a];
  });
  canvas.width = width
  canvas.height = height
  ctx.putImageData(imageData, 0, 0);
})();
