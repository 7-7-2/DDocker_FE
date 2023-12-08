import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react-swc';
import tsconfigpaths from 'vite-tsconfig-paths';
import removeConsole from 'vite-plugin-remove-console';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngQuant from 'imagemin-pngquant';
import imageminGifSicle from 'imagemin-gifsicle';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminSvgo from 'imagemin-svgo';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigpaths(),
    removeConsole(),
    visualizer({
      open: true
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo()
      }
    })
  ]
});
