import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

import pkg from './package.json' assert { type: 'json' }; // ESM 导入 JSON

export default [
  // 打包 JS 文件（ESM 和 CJS）
  {
    input: './index.ts',
    output: [
      {
        file: pkg.main, // 输出为 CommonJS 格式 (e.g., dist/index.cjs.js)
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module, // 输出为 ESM 格式 (e.g., dist/index.esm.js)
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(), // 解析 node_modules 中的依赖
      commonjs(), // 将 CommonJS 转为 ESM
      typescript({ tsconfig: './tsconfig.json' }), // 处理 TypeScript
      terser(), // 压缩代码
    ],
    external: ['vue', '@arco-design/web-vue'], // 外部依赖，不打包进库
  },
  // 打包类型声明文件
  {
    input: './index.ts',
    output: {
      file: pkg.types, // 输出类型声明 (e.g., dist/index.d.ts)
      format: 'esm',
    },
    plugins: [dts()],
  },
];