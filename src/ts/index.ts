import '../css/index.css'

const initRenderCtx = (ctx: WebGLRenderingContext) => {
  ctx.clearColor(0.0, 0.0, 0.0, 1.0);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
}


const main = () => {
  const canvas: HTMLCanvasElement | null = document.querySelector('#root');

  if (!canvas) {
    alert('BOO NOT COOL');
    return;
  }

  const gl: WebGLRenderingContext | null = canvas.getContext('webgl');

  if (!gl) {
    alert('BOO NOT COOL')
    return;
  }
  

  initRenderCtx(gl);
};


main()
