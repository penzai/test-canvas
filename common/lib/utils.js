// 加载图片（异步）
export const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });

// 获取图片的imageData数据
const imgCtxTemp = new WeakMap();
export const getImageData = (img, dx = img.width, dy = img.height) => {
  let ctx;

  if (imgCtxTemp.has(img)) {
    ctx = imgCtxTemp.get(img);
  } else {
    const canvas = new OffscreenCanvas(dx, dy);
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, dx, dy);
    imgCtxTemp.set(img, ctx);
  }

  return ctx.getImageData(0, 0, dx, dy);
};

// 循环处理颜色信息
export const traverse = (
  imageData,
  pass,
  width = imageData.width,
  height = imageData.height
) => {
  const { data } = imageData;
  for (let i = 0; i < width * height * 4; i += 4) {
    const [r, g, b, a] = pass({
      r: data[i] / 255,
      g: data[i + 1] / 255,
      b: data[i + 2] / 255,
      a: data[i + 3] / 255,
      index: i,
      width,
      height,
      x: ((i / 4) % width) / width,
      y: Math.floor(i / 4 / width) / height,
    });
    
    data.set(
      [r, g, b, a].map((v) => Math.round(v * 255)),
      i
    );

    // 简单版本转换
    // const [ r, g, b, a ] = pass({
    //   r: data[i],
    //   g: data[i + 1],
    //   b: data[i + 2],
    //   a: data[i + 3],
    // });
    // data[i] = r;
    // data[i + 1] = g;
    // data[i + 2] = b;
    // data[i + 3] = a;
  }
  return imageData;
};