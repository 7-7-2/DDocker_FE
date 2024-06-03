import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react-swc';
import tsconfigpaths from 'vite-tsconfig-paths';
import removeConsole from 'vite-plugin-remove-console';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngQuant from 'imagemin-pngquant';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminSvgo from 'imagemin-svgo';
import prerender from '@prerenderer/rollup-plugin';
import compression from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      include: [/\.js/, /\.css/],
      threshold: 1400
    }),
    prerender({
      routes: [
        '/',
        '/start',
        '/follow',
        '/mypage',
        '/notification',
        '/post',
        '/post/register',
        '/posts',
        '/search',
        '/profile',
        '/coffee',
        '/report',
        '/support/customerCenter',
        '/support/notice',
        '/support/TOS',
        '/support/privacyPolicy'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        port: 3000,
        host: 'localhost'
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, 'https:')
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            'ddocker.kro.kr/'
          );
      }
    }),
    tsconfigpaths(),
    removeConsole(),
    visualizer({
      open: true
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        svg: imageminSvgo()
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.indexOf('node_modules') !== -1) {
            const module = id.split('node_modules/').pop().split('/')[0];
            return `vendor-${module}`;
          }
        }
      }
    }
  }
});
