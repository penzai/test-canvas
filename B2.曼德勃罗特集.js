const vertex = `
attribute vec2 a_vertexPosition;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  gl_PointSize = 1.0;
  vUv = uv;
  gl_Position = vec4(a_vertexPosition, 1, 1);
}
`;

const fragment = `
#ifdef GL_ES
precision highp float;
#endif
varying vec2 vUv;
uniform vec2 center;
uniform float scale;
uniform int iterations;

vec3 palette(float t, vec3 c1, vec3 c2, vec3 c3, vec3 c4) {
  float x = 1.0 / 3.0;
  if (t < x) return mix(c1, c2, t/x);
  else if (t < 2.0 * x) return mix(c2, c3, (t - x)/x);
  else if (t < 3.0 * x) return mix(c3, c4, (t - 2.0*x)/x);
  return c4;
}
vec2 f(vec2 z, vec2 c) {
  return mat2(z, -z.y, z.x) * z + c;
}
void main() {
    vec2 uv = vUv;
    vec2 c = center + 4.0 * (uv - vec2(0.5)) / scale;
    vec2 z = vec2(0.0);
    bool escaped = false;
    int j;
    for (int i = 0; i < 65536; i++) {
      if(i > iterations) break;
      j = i;
      z = f(z, c);
      if (length(z) > 2.0) {
        escaped = true;
        break;
      }
    }
    // gl_FragColor.rgb = escaped ? vec3(1.0) : vec3(0.0);
    gl_FragColor.rgb = escaped ? max(1.0, log(scale)) * palette(float(j)/ float(iterations), vec3(0.02, 0.02, 0.03), vec3(0.1, 0.2, 0.3), vec3(0.0, 0.3, 0.2), vec3(0.0, 0.5, 0.8))
       : vec3(0.0);
    gl_FragColor.a = 1.0;
}
`;

const canvas = document.querySelector('canvas');
const renderer = new GlRenderer(canvas);

// load fragment shader and createProgram
const program = renderer.compileSync(fragment, vertex);
renderer.useProgram(program);

// renderer.uniforms.center = [0, 0];
// renderer.uniforms.scale = 1;
// renderer.uniforms.iterations = 255;

renderer.uniforms.center = [0.367, 0.303];
renderer.uniforms.scale = 1;
renderer.uniforms.iterations = 256;

renderer.setMeshData([{
positions: [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
],
attributes: {
  uv: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
},
cells: [[0, 1, 2], [2, 0, 3]],
}]);

renderer.render();

function update() {
const factor = Math.max(0.1, Math.log(renderer.uniforms.scale));
renderer.uniforms.scale = (renderer.uniforms.scale += factor) % 10000;
renderer.uniforms.iterations = factor * 500;
requestAnimationFrame(update);
}
setTimeout(update, 2000);