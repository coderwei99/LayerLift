declare module 'vue' {
  export function createApp(...args: any[]): any;
  export function h(...args: any[]): any;
  export const ref: any;
  export const reactive: any;
  export type Component = any;
  export type App = any;
  export type UnwrapNestedRefs<T> = T; // 简化为 any，实际可以更详细
}

declare module '@arco-design/web-vue' {
  export const Modal: any; // 简化为 any，实际可以根据需要细化
}