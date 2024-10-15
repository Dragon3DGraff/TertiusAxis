import { WebGLRenderer } from "three";

export const disposeRenderer = (renderer: WebGLRenderer) => {
  setTimeout(() => {
    try {
      renderer.resetState();
      renderer.dispose();
      renderer.forceContextLoss();
    } catch {
      console.error("disposeRenderer failed");
    }
  }, 100);
};