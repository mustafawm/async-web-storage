import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const isProd = !process.env.ROLLUP_WATCH;

export default {
  input: './src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'umd',
      name: 'asyncWebStorage',
    },
  ],
  plugins: [typescript(), isProd && terser()],
};
