import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [babel({ babelHelpers: 'bundled' }), typescript()],
};
