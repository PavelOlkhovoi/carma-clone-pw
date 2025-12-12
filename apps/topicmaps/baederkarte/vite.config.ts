/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/topicmaps/baederkarte',

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: ['../../..'],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../../dist/apps/topicmaps/baederkarte',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['@carma/math', '@carma-mapping/carma-map-api'],
      onwarn(warning, warn) {
        // Suppress warnings from submodule files
        if (warning.id?.includes('wuppertal-collab-submodule') || warning.id?.includes('pecher-collab-submodule')) {
          return;
        }
        warn(warning);
      },
    },
  },

  define: {
    'import.meta.vitest': undefined,
  },
});
