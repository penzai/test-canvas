import { parametric } from './parametric.js'
import { Vector2D } from './vector2d.js';


const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const { width, height } = canvas
ctx.translate(0.5 * width, 0.5 * height)
ctx.scale(1, -1)

const quadricBezier = parametric(
  (t, [{x: x0}, {x: x1}, {x: x2}]) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
  (t, [{y: y0}, {y: y1}, {y: y2}]) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
);

const p0 = new Vector2D(0, 0);
const p1 = new Vector2D(100, 0);
p1.rotate(0.75);
const p2 = new Vector2D(200, 0);
const count = 30;
for(let i = 0; i < count; i++) {
  // 绘制30条从圆心出发，旋转不同角度的二阶贝塞尔曲线
  p1.rotate(2 / count * Math.PI);
  p2.rotate(2 / count * Math.PI);
  quadricBezier(0, 1, 100, [
    p0,
    p1,
    p2,
  ]).draw(ctx);
}