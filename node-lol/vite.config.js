const { defineConfig } = require('vite');
const path = require('node:path');

module.exports = defineConfig({
  root: __dirname,
  base: '/lol/',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
});