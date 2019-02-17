import '../css/index.css';
import vertVs from '../sl/vert.vs';
import fragFs from '../sl/frag.fs';

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (shader === null) {
    gl.deleteShader(shader);
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  gl.deleteShader(shader);
  return null;
};

const createProgram = (gl: WebGLRenderingContext) => {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertVs);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragFs);
  if (vertex === null) {
    throw new Error('Could not create vertex shader');
  }

  if (fragment === null) {
    throw new Error('Could not create fragment shader');
  }

  const program = gl.createProgram();

  if (program === null) {
    throw new Error('Could not create program');
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    gl.deleteProgram(program);
    throw new Error('Could not create program');
  }

  return program;
};

const initRenderProgram = (gl: WebGLRenderingContext) => {
  gl.canvas.width = gl.canvas.clientWidth;
  gl.canvas.height = gl.canvas.clientHeight;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const program = createProgram(gl);
  gl.useProgram(program);
  return program;
};

const draw = (gl: WebGLRenderingContext, program: WebGLProgram) => {
  gl.clearColor(0.0, 0.0, 0.0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionAttributeLocation)

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
    0.7, 0,
    0.7, 0.5,
    0, 0.5,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  const primitiveType = gl.TRIANGLES;
  const drawOffset = 0;
  const drawCount = 6;
  gl.drawArrays(primitiveType, drawOffset, drawCount);
};

const dieNotSupported = () => {
  alert('BOO NOT COOL');
};

const main = () => {
  const canvas: HTMLCanvasElement | null = document.querySelector('#root');

  if (canvas === null) {
    dieNotSupported();
    return;
  }

  const gl: WebGLRenderingContext | null = canvas.getContext('webgl');

  if (gl === null) {
    dieNotSupported();
    return;
  }

  const program = initRenderProgram(gl);
  draw(gl, program);
};

main();
