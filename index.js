// 加载图片函数
const loadImage = (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = resolve;
  });
};

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

(async () => {
  const res = await loadImage("./img/1.jpg");
  console.log(res);
})();

//   ctx.drawImage(img, 0, 0, 64*5, 96*5)
//   const imageData = ctx.getImageData(300, 200, 50, 50)
//   console.log(imageData);

//   // 设置新的canvas为获取的data数据
//   const canvas2 = document.createElement('canvas')
//   canvas2.width = 200
//   canvas2.height = 200
//   canvas2.getContext('2d').drawImage(imageData.data, 0, 0, 200, 200)
//   document.body.append(canvas2)
