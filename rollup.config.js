import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const isProd = !process.env.ROLLUP_WATCH;

export default isProd
  ? {
      input: './src/index.ts',
      output: {
        dir: 'dist',
        format: 'cjs',
      },
      plugins: [typescript(), terser()],
    }
  : {
      input: './public/example.ts',
      output: {
        dir: 'public',
        format: 'cjs',
      },
      plugins: [typescript()],
    };
